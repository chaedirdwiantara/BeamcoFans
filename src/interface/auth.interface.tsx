import {RegistrationType} from './profile.interface';

export interface RegisterPropsType {
  fullname: string;
  email: string;
  password: string;
  registrationType: RegistrationType;
  image?: string;
  username: string;
}

export interface RegisterResponseType {
  code: number;
  data: {
    id: number;
    uuid: string;
    username: string;
    email: string;
    fullname: string;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
  };
  message: string;
  status: number;
}
