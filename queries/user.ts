import db from "@/lib/db";

export async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, id),
  });

  return user || null;
}

// Expensive query, should use getUserById whereever possible

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  return user || null;
}
