import React from "react";
import Logo295 from "../public/logo.svg";
import Logo327 from "../public/logoipsum-327.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectSeparator,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import WorkspaceSetupDialog from "./workspace-setup-dialog";

const demoWorkspace = [
  {
    name: "Acme Corp.",
    logo: Logo295,
  },
  {
    name: "Ember Fund",
    logo: Logo327,
  },
];

function WorkspacePicker() {
  return (
    <div className="py-4">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="No Workspace Selected" />
        </SelectTrigger>
        <SelectContent className="space-y-2">
          {demoWorkspace.map((workspace) => (
            <SelectItem key={workspace.name} value={workspace.name}>
              <div className="flex items-center space-x-2 w-full">
                <img
                  src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                  alt={workspace.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{workspace.name}</span>
              </div>
            </SelectItem>
          ))}

          <SelectSeparator />
          <WorkspaceSetupDialog>
            <Button variant="ghost" className="w-full gap-x-2">
              <PlusCircle className="w-4 h-4" />
              Create Workspace
            </Button>
          </WorkspaceSetupDialog>
        </SelectContent>
      </Select>
    </div>
  );
}

export default WorkspacePicker;
