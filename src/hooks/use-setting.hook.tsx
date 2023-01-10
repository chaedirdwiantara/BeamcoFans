import {useState} from 'react';
import {
  getVerifCode,
  setVerifCode,
  updateEmail,
  updatePhoneNumber,
} from '../api/setting.api';
import {
  EmailPhoneProps,
  EmailPhoneVerifProps,
} from '../interface/setting.interface';

export const useSettingHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const changeEmail = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await updateEmail(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const changePhoneNumber = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await updatePhoneNumber(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getVerificationCode = async (props?: EmailPhoneVerifProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await getVerifCode(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setVerificationCode = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await setVerifCode(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    changeEmail,
    changePhoneNumber,
    getVerificationCode,
    setVerificationCode,
  };
};
