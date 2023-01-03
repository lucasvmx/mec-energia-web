/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SignInResponsePayload } from "@/types/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "credentials",
      name: "CredentialsProvider",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await fetch("http://localhost:8080/api/token/", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const authPayload: SignInResponsePayload = JSON.parse(
            await data.text()
          );

          return {
            email: authPayload.user.email,
            name: authPayload.user.name,
            id: "",
            token: authPayload.token,
          };
        } catch (error) {
          throw new Error(`SignIn Fails ${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.token = token.token;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
