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