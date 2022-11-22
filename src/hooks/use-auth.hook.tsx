import {useState} from 'react';
import {loginUser, registerUser} from '../api/auth.api';
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
  const [errorMsg, setErrorMsg] = useState<string>('');
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
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMsg(error.response?.data?.data);
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
    onRegisterUser,
    onLoginUser,
  };
};
