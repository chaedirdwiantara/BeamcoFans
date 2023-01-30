export type EmailPhoneProps = {
  email?: string;
  phoneNumber?: string;
  code: string;
};

export type EmailPhoneVerifProps = {
  email?: string;
  phoneNumber?: string;
};

export type VerifPasswordSetting = {
  email?: string;
  phoneNumber?: string;
  password: string;
};

export type OtpPhoneScreen = {
  phoneNumber: string;
  countryNumber: string | null;
  type: PhoneSettingTypeProps;
};

export type PhoneSettingTypeProps = 'Add' | 'Change';

export type EmailPhoneResponseType = {
  code: number;
  data: any;
  message: string | undefined;
  status: number;
};

export type OtpEmailScreen = {
  email: string;
  type: PhoneSettingTypeProps;
};

export type ChangePasswordProps = {
  password: string;
  newPassword: string;
  repeatPassword: string;
};

export type ChangePasswordResponseType = {
  code: number;
  data: string | null;
  message: string;
  status: number;
};

export type DataShippingProps = {
  email: string;
  phoneNumber: string;
  fullname: string;
  province: string;
  country: string;
  postalCode: number;
  city: string;
  address: string;
};

export type ShippingResponseType = {
  code: number;
  data: DataShippingProps;
  message: string;
  status: number;
};
