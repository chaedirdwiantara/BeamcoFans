import axios from 'axios';
import {useState} from 'react';
import {
  countLikedSong,
  getOtherUserProfile,
  getProfile,
  updateProfile,
  UpdateProfilePropsType,
} from '../api/profile.api';
import {applyReferral} from '../api/referral.api';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {
  DataCountLiked,
  ProfileResponseType,
} from '../interface/profile.interface';

export const useProfileHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isValidReferral, setIsValidReferral] = useState<boolean | null>(null);
  const [dataProfile, setDataProfile] = useState<ProfileResponseType>();
  const [dataUserCheck, setDataUserCheck] = useState<'Musician' | 'Fans' | ''>(
    '',
  );
  const [dataCountLiked, setCountLiked] = useState<DataCountLiked>();

  const getProfileUser = async () => {
    setIsLoading(true);
    try {
      const response = await getProfile();
      setDataProfile(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOtherProfileUser = async (props?: PostPropsTypeA) => {
    setIsLoading(true);
    try {
      const response = await getOtherUserProfile(props);
      setDataProfile(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCheckUser = async (props?: PostPropsTypeA) => {
    setIsLoading(true);
    try {
      const response = await getOtherUserProfile(props);
      response.data === null
        ? setDataUserCheck('Musician')
        : setDataUserCheck('Fans');
    } catch (error) {
      setDataUserCheck('');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileUser = async (
    props?: UpdateProfilePropsType,
    trigger?: boolean,
  ) => {
    setIsLoading(true);
    try {
      await updateProfile(props);
      if (trigger) {
        const response = await getProfile();
        setDataProfile(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePreference = async (props?: UpdateProfilePropsType) => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await updateProfile(props);
      console.log({resp});
      setSuccessMsg(resp.message);
    } catch (error) {
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

  const applyReferralUser = async (refCode: string) => {
    try {
      setIsLoading(true);
      const response = await applyReferral(refCode);
      if (response.code === 200) {
        setIsValidReferral(true);
      } else {
        setIsValidReferral(false);
        setErrorMsg(response.message);
      }
    } catch (error) {
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

  const getUserCountLikedSong = async (props?: ParamsProps) => {
    setIsLoading(true);
    try {
      const response = await countLikedSong(props);
      setCountLiked(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    successMsg,
    isValidReferral,
    dataProfile,
    dataUserCheck,
    dataCountLiked,
    setDataUserCheck,
    getProfileUser,
    updateProfileUser,
    applyReferralUser,
    updateProfilePreference,
    getOtherProfileUser,
    getCheckUser,
    getUserCountLikedSong,
  };
};
