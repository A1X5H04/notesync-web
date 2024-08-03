"use server";
import { signUpSchema } from "@/lib/zod-schemas";
import { createResponse } from "@/lib/utils";
import bcryptjs from "bcryptjs";
import z from "zod";
import db from "@/lib/db";
import { users } from "@/db/schema";

const avatars = [
  "Bailey",
  "Precious",
  "Whiskers",
  "Simba",
  "Simon",
  "Willow",
  "Pepper",
];

export async function register(values: z.infer<typeof signUpSchema>) {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return createResponse(false, "Invalid Fields");
  }

  const { username, email, password } = validatedFields.data;
  const hashPassword = await bcryptjs.hash(password, 12);

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (user) {
    return createResponse(false, "User already exists");
  }

  await db.insert(users).values({
    email,
    name: username,
    image: `https://api.dicebear.com/9.x/shapes/svg?seed=${
      avatars[Math.floor(Math.random() * avatars.length)]
    }&shape1=ellipseFilled,polygonFilled,rectangleFilled,line`,
    hashedPassword: hashPassword,
  });

  return createResponse(true, "User created successfully!");
}
