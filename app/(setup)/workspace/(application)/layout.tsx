import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="w-full h-full">
        <Header />
        <main className="flex-1 w-full h-full">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
