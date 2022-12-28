export type SignInPayload = {
  token: string;
  user: UserSignPayload;
};

export type UserSignPayload = {
  email: string;
  name: string;
  type: string;
  university: number;
};

export type SignDto = {
  username: string;
  password: string;
};
