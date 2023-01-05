import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInResponsePayload } from "@/types/auth";

const signInUrl = `${process.env.API_URL}/token/`;

const authOptions: NextAuthOptions = {
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
      authorize: async (credentials) => {
        const response = await fetch(signInUrl, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok || !response) {
          return null;
        }

        const {
          user: { email, id, name, type, universityId },
          token,
        }: SignInResponsePayload = await response.json();

        return {
          id,
          name,
          email,
          type,
          token,
          universityId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.token = token.token;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
