import NextAuth from "next-auth";
import authConfig from "./nextauth-edge";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
