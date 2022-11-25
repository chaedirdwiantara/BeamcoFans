import {useState} from 'react';
import {checkUsername, loginUser, registerUser} from '../api/auth.api';
import {
  LoginPropsType,
  LoginResponseType,
  RegisterPropsType,
  RegisterResponseType,
} from '../interface/auth.interface';
import axios from 'axios';

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

  return {
    isLoading,
    isError,
    authResult,
    loginResult,
    errorMsg,
    errorCode,
    errorData,
    isValidUsername,
    onRegisterUser,
    onLoginUser,
    checkUsernameAvailability,
  };
};
