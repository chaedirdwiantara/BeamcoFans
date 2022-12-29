import {useState} from 'react';
import {Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings, LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {v4 as uuid} from 'uuid';
import {
  checkUsername,
  confirmEmailOtpRegister,
  confirmSmsOtpLogin,
  loginSso,
  loginUser,
  registerUser,
  resendOtpEmail,
  resendOtpSms,
} from '../api/auth.api';
import {
  LoginPropsType,
  LoginResponseType,
  RegisterPropsType,
  RegisterResponseType,
} from '../interface/auth.interface';
import axios from 'axios';
import {storage} from '../hooks/use-storage.hook';
import {getProfile} from '../api/profile.api';
import {deleteTokenFCM} from '../service/notification';

export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [errorData, setErrorData] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null);
  const [authResult, setAuthResult] = useState<RegisterResponseType | null>(
    null,
  );
  const [loginResult, setLoginResult] = useState<null | 'preference' | 'home'>(
    null,
  );
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);

  const onRegisterUser = async (props: RegisterPropsType) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await registerUser(props);
      console.log(response);
      if (response.code !== 200) {
        setIsError(true);
        setErrorMsg(response.message);
      } else {
        setAuthResult(response);
      }
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMsg(error.response?.data?.data);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginUser = async (props: LoginPropsType) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const response = await loginUser(props);
      if (response.data.accessToken) {
        storage.set('profile', JSON.stringify(response.data));
        if (response.data.lastLoginAt === null) {
          setLoginResult('preference');
        } else {
          setLoginResult('home');
        }
      }
    } catch (error) {
      setIsError(true);

      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        if (error.response?.data?.data?.email) {
          setErrorData(error.response?.data?.data?.email);
        } else if (error.response?.data?.data?.phoneNumber) {
          setErrorData(error.response?.data?.data?.phoneNumber);
        }
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg('Email or Username not registered');
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginGoogle = async () => {
    setErrorMsg('');
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setIsLoading(true);
      const response = await loginSso(userInfo.user.email, 'google');
      storage.set('profile', JSON.stringify(response.data));
      if (response.data.lastLoginAt === null) {
        setLoginResult('preference');
      } else {
        setLoginResult('home');
      }
    } catch (error) {
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        if (error.response?.data?.data?.email) {
          setErrorData(error.response?.data?.data?.email);
        } else if (error.response?.data?.data?.phoneNumber) {
          setErrorData(error.response?.data?.data?.phoneNumber);
        }
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginFacebook = async () => {
    Settings.setAppID('687852656020966');
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(res => {
        console.log(res);
        if (!res.isCancelled) {
          AccessToken.getCurrentAccessToken().then(token => {
            // console.log(token);
            // TODO: get email from FB graphapi after apps is live
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onLoginApple = async () => {
    if (Platform.OS === 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
    } else if (Platform.OS === 'android') {
      const rawNonce = uuid();
      const state = uuid();
      appleAuthAndroid.configure({
        clientId: 'io.sunnysideup.user',
        redirectUri: 'https://sunnysideup.io/example',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });
      const response = await appleAuthAndroid.signIn();
    }

    // TODO: store the user id of apple to db
  };

  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await checkUsername(username);
      setIsError(false);
      setIsValidUsername(response.data);
      setErrorMsg('');
    } catch (error) {
      setIsError(true);
      setIsValidUsername(false);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };

  const confirmEmailOtp = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      const response = await confirmEmailOtpRegister(email, code);
      if (response.status === 1) {
        if (response.data.lastLoginAt === null) {
          setLoginResult('preference');
        } else {
          setLoginResult('home');
        }
        storage.set('profile', JSON.stringify(response.data));
        setIsOtpValid(true);
        setIsError(false);
      } else if (response.status === 0) {
        setIsOtpValid(false);
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      setIsOtpValid(false);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSmsOtp = async (phoneNumber: string, code: string) => {
    setIsLoading(true);
    try {
      const response = await confirmSmsOtpLogin(phoneNumber, code);
      // TODO: check the attribute to store the fullname and valuable information
      // storage.set('profile', JSON.stringify(response.data));
      setIsOtpValid(true);
    } catch (error) {
      setIsError(true);
      setIsOtpValid(false);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtpEmail = async (email: string) => {
    setIsLoading(true);
    try {
      await resendOtpEmail(email);
    } catch (error) {
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtpSms = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      await resendOtpSms(phoneNumber);
    } catch (error) {
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      storage.clearAll();
      await deleteTokenFCM();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isLoading,
    isError,
    authResult,
    loginResult,
    errorMsg,
    errorCode,
    errorData,
    isValidUsername,
    isOtpValid,
    onRegisterUser,
    onLoginUser,
    onLoginGoogle,
    onLoginFacebook,
    onLoginApple,
    checkUsernameAvailability,
    confirmEmailOtp,
    confirmSmsOtp,
    sendOtpEmail,
    sendOtpSms,
    onLogout,
  };
};
