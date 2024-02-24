"use client";

import { UserButton } from "@clerk/nextjs";

export function NavBar() {
  return (
    <div
      className="flex items-center gap-x-4 p-5 bg-green-500"
      data-testid="dashboard-navbar"
    >
      <div className="hidden lg:flex lg:flex-1">
        {/* TODO: Add Search here */}
      </div>
      <UserButton />
    </div>
  );
}
