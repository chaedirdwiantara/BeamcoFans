import {useState} from 'react';
import {registerUser} from '../api/auth.api';
import {
  RegisterPropsType,
  RegisterResponseType,
} from '../interface/auth.interface';

export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [authResult, setAuthResult] = useState<RegisterResponseType | null>(
    null,
  );

  const onRegisterUser = async (props: RegisterPropsType) => {
    setIsLoading(true);
    try {
      const response = await registerUser(props);
      setAuthResult(response);
      // TODO: add token into localstorage
      // TODO: add profile info to localstorage
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    authResult,
    onRegisterUser,
  };
};
