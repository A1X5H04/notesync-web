import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "./queries/user";

// Notice this is only an object, not a full Auth.js instance

// TODO: Add credentials signin
export default {
  providers: [GitHub],
} satisfies NextAuthConfig;
