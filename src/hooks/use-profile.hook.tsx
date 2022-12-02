import {useState} from 'react';
import {updateProfile, UpdateProfilePropsType} from '../api/profile.api';

export const useProfileHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProfilePreference = async (props?: UpdateProfilePropsType) => {
    try {
      const response = await updateProfile(props);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateProfilePreference,
  };
};
