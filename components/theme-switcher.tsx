"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
  const theme = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        theme.setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"))
      }
    >
      {theme.theme == "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
}

export default ThemeSwitcher;
