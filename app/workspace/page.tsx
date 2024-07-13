import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function WorkspacePage() {
  const supabaseClient = createClient();

  const { data } = await supabaseClient.auth.getUser();

  if (!data.user) {
    redirect("/auth/login");
  }

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.userId, data.user.id),
  });

  if (!workspace) return <div>Hello THere</div>;

  redirect(`/workspace/${workspace.id}`);
}

export default WorkspacePage;
