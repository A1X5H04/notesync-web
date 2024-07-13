"use server";
import { loginSchema } from "@/lib/zod-schemas";
import { createResponse } from "@/lib/utils";
import z from "zod";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/lib/supabase/server";

export async function signUp(values: z.infer<typeof loginSchema>) {
  const supabase = createClient();
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return createResponse(false, "Invalid Fields");
  }

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return createResponse(false, error.message);
  }

  return createResponse(true, "User created successfully!");
}
