export type SignInResponsePayload = {
  token: string;
  user: UserSignInResponsePayload;
};

export type UserSignInResponsePayload = {
  email: string;
  name: string;
  type: string;
  university: number;
};

export type SignInRequestPayload = {
  username: string;
  password: string;
};
