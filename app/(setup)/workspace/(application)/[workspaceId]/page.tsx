import { Button } from "@/components/ui/button";
import React from "react";

function WorkspaceIdPage() {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Notique.</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Elevate your productivity with Notique, your all-in-one platform for
          notes, tasks, and project management.
        </p>
        <div className="flex flex-col space-y-4">
          <Button>Start by creating a...</Button>
          <Button variant="outline">Join a workspace</Button>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceIdPage;
