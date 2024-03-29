import {useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  checkUsername,
  confirmEmailOtpRegister,
  confirmSmsOtpLogin,
  loginSso,
  loginUser,
  registerUser,
  resendOtpEmail,
  resendOtpSms,
  loginPhoneNumber,
  forgotPasswordEmail,
  confirmEmailOtpForgotPassword,
  changePassword,
  changePasswordSetting,
} from '../api/auth.api';
import {
  LoginPhonePropsType,
  LoginPropsType,
  RegisterPropsType,
  RegisterResponseType,
} from '../interface/auth.interface';
import axios from 'axios';
import {storage} from '../hooks/use-storage.hook';
import {deleteTokenFCM} from '../service/notification';
import {RegistrationType} from '../interface/profile.interface';

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
  const [loginResult, setLoginResult] = useState<
    null | 'preference' | 'home' | 'recover'
  >(null);
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);
  const [ssoRegistered, setSsoRegistered] = useState<boolean | null>(null);
  const [ssoError, setSsoError] = useState<boolean>(false);
  const [ssoErrorMsg, setSsoErrorMsg] = useState<string>('');
  const [ssoEmail, setSsoEmail] = useState<string>('');
  const [ssoType, setSsoType] = useState<RegistrationType>();
  const [ssoId, setSsoId] = useState<string>('');
  const [ssoFullname, setSsoFullname] = useState<string>('');
  const [isRegisterSSO, setIsRegisterSSO] = useState<boolean>(false);

  const onRegisterUser = async (props: RegisterPropsType) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await registerUser(props);

      if (response.code === 200) {
        storage.set('claimCredits', true);
        setAuthResult(response);
      } else {
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginUser = async (
    props: LoginPropsType | LoginPhonePropsType,
    type: string,
  ) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      let response;
      if (type === 'email') {
        response = await loginUser(props);
      } else {
        response = await loginPhoneNumber(props);
      }

      if (response.code === 200 || response.code === 401) {
        if (response.data.accessToken) {
          storage.set('profile', JSON.stringify(response.data));
          if (response.data.deletedAt === null) {
            // BEAM-1436: Remove step wizard after sign up
            // if (response.data.lastLoginAt === null) {
            //   setLoginResult('preference');
            // } else {
            setLoginResult('home');
            // }
          } else {
            setLoginResult('recover');
          }
        }
      } else if (response.code !== 1010) {
        setIsError(true);
        setErrorMsg(response.message);
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

  const onLoginGoogle = async () => {
    setIsError(false);
    setErrorMsg('');
    setSsoRegistered(null);
    setIsRegisterSSO(false);
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const response = await loginSso(userInfo.user.email, 'google');
      if (response.code === 1003) {
        setSsoEmail(userInfo.user.email ?? '');
        setSsoId(userInfo.user.id);
        setSsoFullname(userInfo.user.name ?? userInfo.user.email.split('@')[0]);
        setSsoType('google');
        setSsoRegistered(false);
        setIsRegisterSSO(true);
      } else if (response.code === 200) {
        setSsoRegistered(true);
        if (response.data.accessToken) {
          storage.set('profile', JSON.stringify(response.data));
          if (response.data.deletedAt === null) {
            // BEAM-1436: Remove step wizard after sign up
            // if (response.data.lastLoginAt === null) {
            //   setLoginResult('preference');
            // } else {
            setLoginResult('home');
            // }
          } else {
            setLoginResult('recover');
          }
        }
      } else {
        setSsoError(true);
        setSsoErrorMsg(response.message);
      }
    } catch (error: any) {
      setSsoError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setSsoErrorMsg(error.response?.data?.message);
      } else {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          setSsoErrorMsg('Login cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          setSsoErrorMsg('Process sign in already running');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          setSsoErrorMsg('Play services not available or outdated');
        } else {
          // some other error happened
          setSsoErrorMsg('Error occured unknow error');
        }
      }
    }
  };

  const onLoginApple = async () => {
    setIsError(false);
    setSsoRegistered(null);
    setIsRegisterSSO(false);
    setSsoEmail('');
    setErrorMsg('');
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const response = await loginSso(appleAuthRequestResponse.user, 'apple');
        if (response.code === 1003) {
          setSsoEmail(appleAuthRequestResponse.email ?? '');
          setSsoFullname(
            appleAuthRequestResponse.fullName?.nickname ??
              appleAuthRequestResponse.email?.split('@')[0] ??
              'Unnamed',
          );
          setSsoId(appleAuthRequestResponse.user);
          setSsoType('apple');
          setSsoRegistered(false);
          setIsRegisterSSO(true);
        } else if (response.code === 200) {
          setSsoRegistered(true);
          if (response.data.accessToken) {
            storage.set('profile', JSON.stringify(response.data));
            if (response.data.deletedAt === null) {
              // BEAM-1436: Remove step wizard after sign up
              // if (response.data.lastLoginAt === null) {
              //   setLoginResult('preference');
              // } else {
              setLoginResult('home');
              // }
            } else {
              setLoginResult('recover');
            }
          }
        } else {
          setSsoError(true);
          setSsoErrorMsg(response.message);
        }
      }
    } catch (error) {
      setSsoError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setSsoErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setSsoErrorMsg(error.message);
      }
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    setIsError(false);
    setErrorMsg('');
    try {
      const response = await checkUsername(username);
      setIsValidUsername(response.data);
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

  const confirmEmailOtp = async (
    email: string,
    code: string,
    context: string,
  ) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await confirmEmailOtpRegister(email, code, context);
      if (response.status === 1) {
        // BEAM-1436: Remove step wizard after sign up
        // if (response.data.lastLoginAt === null) {
        //   setLoginResult('preference');
        // } else {
        setLoginResult('home');
        // }
        storage.set('profile', JSON.stringify(response.data));
        setIsOtpValid(true);
        setIsError(false);
      } else if (response.status === 0) {
        setIsOtpValid(false);
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.log(error);
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

  const confirmSmsOtp = async (
    phoneNumber: string,
    code: string,
    context: string,
  ) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await confirmSmsOtpLogin(phoneNumber, code, context);
      if (response.code === 200) {
        storage.set('profile', JSON.stringify(response.data));
        if (response.data.deletedAt === null) {
          // BEAM-1436: Remove step wizard after sign up
          // if (response.data.lastLoginAt === null) {
          //   setLoginResult('preference');
          // } else {
          setLoginResult('home');
          // }
        } else {
          setLoginResult('recover');
        }
        setIsOtpValid(true);
      } else {
        setIsOtpValid(false);
        setIsError(true);
        setErrorMsg(response.message);
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

  const sendOtpEmail = async (email: string, context?: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      await resendOtpEmail(email, context);
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

  const sendOtpSms = async (phoneNumber: string, context?: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const resp = await resendOtpSms(phoneNumber, context);
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message);
      }
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
      storage.set('skipOnboard', true);
      await deleteTokenFCM();
    } catch (err) {
      console.log(err);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await forgotPasswordEmail(email);
      if (response.code === 200) {
        setIsError(false);
      } else {
        setIsError(true);
        setErrorMsg(response.message);
      }
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

  const confirmEmailOtpFP = async (email: string, code: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await confirmEmailOtpForgotPassword(email, code);
      if (response.code === 200) {
        setIsOtpValid(true);
        setIsError(false);
      } else if (response.status === 0) {
        setIsOtpValid(false);
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.log(error);
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

  const onChangePassword = async (
    email: string,
    code: string,
    password: string,
  ) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const response = await changePassword(email, code, password);
      if (response.code === 200) {
        if (response.data.accessToken) {
          storage.set('profile', JSON.stringify(response.data));
          if (response.data.deletedAt === null) {
            // BEAM-1436: Remove step wizard after sign up
            // if (response.data.lastLoginAt === null) {
            //   setLoginResult('preference');
            // } else {
            setLoginResult('home');
            // }
          } else {
            setLoginResult('recover');
          }
        }
      } else {
        setIsError(true);
        setErrorMsg(response.message);
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

  const onChangePasswordSetting = async (
    password: string,
    newPassword: string,
  ) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const response = await changePasswordSetting(password, newPassword);
      if (response.code === 200) {
        if (response.data.accessToken) {
          storage.set('profile', JSON.stringify(response.data));
        }
      } else {
        setIsError(true);
        setErrorMsg(response.message);
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
    onLoginApple,
    checkUsernameAvailability,
    confirmEmailOtp,
    confirmSmsOtp,
    sendOtpEmail,
    sendOtpSms,
    onLogout,
    ssoRegistered,
    setSsoRegistered,
    ssoEmail,
    ssoError,
    ssoErrorMsg,
    setSsoError,
    ssoType,
    ssoId,
    forgotPassword,
    confirmEmailOtpFP,
    onChangePassword,
    onChangePasswordSetting,
    ssoFullname,
    isRegisterSSO,
  };
};
