import {useState} from 'react';
import {Image} from 'react-native-image-crop-picker';
import {uploadImage} from '../api/uploadImage.api';

export const useUploadImageHook = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [dataImage, setDataImage] = useState<string>('');
  const [isErrorImage, setIsErrorImage] = useState(false);

  const setUploadImage = async (image: Image) => {
    try {
      const response = await uploadImage(image);
      setDataImage(response.data);
    } catch (error) {
      setIsErrorImage(true);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return {
    isLoadingImage,
    isErrorImage,
    dataImage,
    setUploadImage,
  };
};
