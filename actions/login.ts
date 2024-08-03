"use server";
import { loginSchema } from "@/lib/zod-schemas";
import { createResponse } from "@/lib/utils";
import { signIn, signOut } from "@/auth";
import z from "zod";
import db from "@/lib/db";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid Fields");
  }

  const { email, password } = validatedFields.data;

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    return { status: false, message: "User does not exist" };
  }

  signIn("credentials", {
    email,
    password,
  });

  return { status: true, message: "Successfully Logged In!" };
}

export async function logout() {
  await signOut();
}
