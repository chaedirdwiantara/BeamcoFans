import axios from 'axios';
import {useState} from 'react';
import {
  addPhoneNumber,
  getVerifCode,
  setVerifCode,
  updateEmail,
  updatePhoneNumber,
  verifPasswordPhone,
} from '../api/setting.api';
import {
  EmailPhoneProps,
  EmailPhoneVerifProps,
  VerifPasswordPhone,
} from '../interface/setting.interface';

export const useSettingHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

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

  const verificationPasswordPhone = async (props?: VerifPasswordPhone) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const resp = await verifPasswordPhone(props);
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addNewPhoneNumber = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await addPhoneNumber(props);
      console.log({resp});
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      } else {
        setSuccessMsg(resp.message as string);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
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
    changeEmail,
    changePhoneNumber,
    getVerificationCode,
    setVerificationCode,
    verificationPasswordPhone,
    errorMsg,
    setIsError,
    addNewPhoneNumber,
    successMsg,
  };
};
