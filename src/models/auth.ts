export interface LoginPayload {
  phone: string;
  password: string
}

export interface LoginResponse {
  id: number;
  name: string;
  token?: string;
  phone: string;
  created_at: string;
  updated_at: string;
  email: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
}

export interface SignupPayload {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
  termsAndConditions?: boolean
}

export interface SignupResponse {
  id?: number;
  name?: string;
  phone?: string;
  updated_at?: string;
  created_at?: boolean;
  errors?: { [key: string]: string[] };
  message?: string
}

export interface VerifyAccountOTP {
  otp: string
}

// Reset Password 

export interface ResetPasswordSendOTPPayload {
  phone: string
}

export interface ResetPasswordSendOTPResponse {
  message: string;
  errors?: { [key: string]: string[] };
}

export interface ResetPasswordValidateOTPPayload {
  code: string;
  phone: string
}

export interface ResetPasswordValidateOTPResponse {
  message: string;
  result?: string;
  errors?: { [key: string]: string[] };
}

export interface ResetPasswordPayload {
  code: string;
  phone: string;
  password: string;
  password_confirmation?: string
}

export interface ResetPasswordResponse {
  message: string;
  errors?: { [key: string]: string[] };
}
