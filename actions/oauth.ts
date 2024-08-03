"use server";

import { signIn } from "@/auth";

export async function oauthSignIn(provider: string) {
  switch (provider) {
    case "google":
      await signIn("google");
      break;
    case "github":
      await signIn("github");
      break;
    default:
      throw new Error("Invalid Provider");
  }
}
