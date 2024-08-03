import React from "react";
import SetupHeading from "./heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ComboboxDemo } from "@/components/ui/combobox";

function MembersForm({ workspaceId }: { workspaceId: string }) {
  const [members, setMembers] = React.useState([]);

  return (
    <>
      <SetupHeading
        title="Add workspace members"
        description="Collaborate with your team by adding members to your workspace"
      />
      <div className="my-6 space-y-4">
        <ComboboxDemo />
        <div className="w-full h-72"></div>
      </div>

      <div className="flex flex-col gap-y-4">
        <Button className="w-full" type="submit">
          Add members
        </Button>
        <Link
          className="text-center hover:underline text-sm font-semibold"
          href={`/workspace/${workspaceId}`}
        >
          Skip for now
        </Link>
      </div>
    </>
  );
}

export default MembersForm;
