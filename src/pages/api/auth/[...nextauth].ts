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

        const signInPayload:SignInResponsePayload = await response.json()
        
        const {
          user: { email, id, name, type, university_id },
          token,
        } = signInPayload;

        return {
          id,
          name,
          email,
          type,
          token,
          university_id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.university_id = user.university_id;
        token.type = user.type;
        token.id = user.id as number;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.token = token.token;
        session.user.university_id = token.university_id;
        session.user.type = token.type;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
