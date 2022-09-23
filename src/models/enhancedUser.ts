type StringOrFalsy = string | null | undefined;

export interface EnhancedUser {
  name?: StringOrFalsy;
  email?: StringOrFalsy;
  image?: StringOrFalsy;
  token?: StringOrFalsy;
}