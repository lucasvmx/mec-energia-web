import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    type: string;
    university_id: number | null;
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
    university_id: number | null;
  }
}
