import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import SetupForm from "../_components/setup-form";
import WorkspaceSetup from "../_components/setup";
import { auth } from "@/auth";

async function WorkspacePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.userId, session.user?.id || ""),
  });

  if (!workspace)
    return (
      <div className="grid place-items-center w-full h-full">
        <WorkspaceSetup />
      </div>
    );

  redirect(`/workspace/${workspace.id}`);
}

export default WorkspacePage;
