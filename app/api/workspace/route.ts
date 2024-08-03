import { auth } from "@/auth";
import { workspaces } from "@/db/schema";
import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      console.log({ session });
      return new Response("Unauthorized", { status: 401 });
    }

    const workspace = await db.query.workspaceMembers.findMany({
      where: (workspace, { eq }) =>
        eq(workspace.userId, session.user?.id || ""),
      with: workspaces,
    });

    return Response.json(workspace);
  } catch (err) {
    console.error("Error in GET /api/workspace", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { icon, title, isPrivate, description } = await req.json();
    const session = await auth();

    if (!session || !session.user?.id) {
      console.log({ session });
      return new Response("Unauthorized", { status: 401 });
    }

    const workspace = await db
      .insert(workspaces)
      .values({
        userId: session.user?.id,
        title,
        icon,
        isPrivate,
        description,
      })
      .returning({ id: workspaces.id });

    return Response.json(workspace[0]);
  } catch (err) {
    console.error("Error in POST /api/workspace", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
