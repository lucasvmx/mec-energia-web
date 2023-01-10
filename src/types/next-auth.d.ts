import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    type: string;
    universityId: number | null;
    token: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    id:number;
    type: string;
    universityId: number | null;
  }
}
