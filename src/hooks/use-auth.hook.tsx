import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings, LoginManager, AccessToken} from 'react-native-fbsdk-next';
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
  const [loginResult, setLoginResult] = useState<LoginResponseType | null>(
    null,
  );
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);

  const onRegisterUser = async (props: RegisterPropsType) => {
    setIsLoading(true);
    try {
      const response = await registerUser(props);
      setAuthResult(response);
      // TODO: add token into localstorage
      // TODO: add profile info to localstorage
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
      setLoginResult(response);
      // TODO: add token into localstorage
      // TODO: add profile info to localstorage
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

  const onLoginGoogle = async () => {
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setIsLoading(true);
      const response = await loginSso(userInfo.user.email, 'google');
      setLoginResult(response);
      // TODO: add token into localstorage
      // TODO: add profile info to localstorage
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
      storage.set('accessToken', response.data.accessToken);
      storage.set('refreshToken', response.data.refreshToken);
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

  const confirmSmsOtp = async (phoneNumber: string, code: string) => {
    setIsLoading(true);
    try {
      const response = await confirmSmsOtpLogin(phoneNumber, code);
      storage.set('accessToken', response.data.accessToken);
      storage.set('refreshToken', response.data.refreshToken);
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
    checkUsernameAvailability,
    confirmEmailOtp,
    confirmSmsOtp,
    sendOtpEmail,
    sendOtpSms,
  };
};
