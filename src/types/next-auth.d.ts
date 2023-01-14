import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    universityId?: number;
    token: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    type: string;
    universityId?: number;
  }
}
