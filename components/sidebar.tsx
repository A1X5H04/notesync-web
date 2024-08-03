"use client";

import React, { useState } from "react";
import WorkspacePicker from "./workspace-picker";
import Image from "next/image";
import Logo from "../public/logo.svg";
import {
  Archive,
  CalendarDays,
  Home,
  ListTodo,
  LogOut,
  Moon,
  NotepadText,
  Settings,
  Settings2,
  SquareKanban,
  Trash,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme-switcher";

const routes = [
  {
    icon: NotepadText,
    name: "Notes",
    path: "/notes",
  },
  {
    icon: SquareKanban,
    name: "Projects",
    path: "/projects",
  },
  {
    icon: CalendarDays,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: ListTodo,
    name: "Tasks",
    path: "/tasks",
  },
];

function Sidebar() {
  const [sidebarWidth, setSidebarWidth] = useState(300);

  return (
    <aside className="flex flex-col justify-between w-full min-w-10 max-w-64 h-full border-r relative py-4 px-4">
      <div>
        <WorkspacePicker />
        <ul className="mt-2 mb-4 space-y-1 text-sm">
          {routes.map((route) => (
            <li
              key={route.name}
              className="inline-flex items-center gap-x-2 w-full cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted font-medium rounded-md p-2"
            >
              <route.icon className="w-4 h-4" />
              <span>{route.name}</span>
            </li>
          ))}
        </ul>
        <Separator />
        <div>
          <h2 className="uppercase text-xs text-muted-foreground font-bold mt-4">
            Folders
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>First Note</li>
            <li>Second Note</li>
            <li>Third Note</li>
          </ul>
        </div>
        <div>
          <h2 className="uppercase text-xs text-muted-foreground font-bold mt-4">
            Tags
          </h2>
          <ul className="flex-wrap gap-x-2 mt-4 text-sm">
            <li className="inline-flex items-center gap-x-2">
              <span className="w-2 h-2 bg-emerald-700 rounded-full" />
              <span>First Note</span>
            </li>
            <li className="inline-flex items-center gap-x-2">
              <span className="w-2 h-2 bg-cyan-700 rounded-full" />
              <span>First Note</span>
            </li>

            <li className="inline-flex items-center gap-x-2">
              <span className="w-2 h-2 bg-fuchsia-700 rounded-full" />
              <span>First Note</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Separator />
        <div className="flex items-center justify-between py-3">
          <div className="inline-flex items-center gap-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://images.unsplash.com/photo-1601382270349-49c15bddf738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>

            <div className="leading-none">
              <h5 className="text-sm">John Doe</h5>
              <span className="text-xs text-muted-foreground">
                johndoe@gmail.com
              </span>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="w-1.5 cursor-ew-resize h-full absolute top-0 -right-0.5 opacity-0 hover:opacity-100 bg-muted" />
    </aside>
  );
}

export default Sidebar;
