"use server";
import { loginSchema } from "@/lib/zod-schemas";
import { createResponse } from "@/lib/utils";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

export async function login(values: z.infer<typeof loginSchema>) {
  const supabase = createClient();
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid Fields");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    console.log("Login Error", error.message);
    throw new Error(error.message);
  }

  return data;
}
