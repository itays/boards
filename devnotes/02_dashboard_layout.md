# Creating a Dashboard layout

1. Created a page.tsx at /app/(dashboard)/page.tsx. the (dashboard) is not part of the routing mechanism, it's just for organization. it will be the main page for dashboards.
2. Created dashboard layout at /app/(dashboard)/layout.tsx

```tsx
import { NavBar } from "./_components/navbar";
import { OrgSidebar } from "./_components/orgsidebar";
import { Sidebar } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full" data-testid="dashboard-layout">
      <Sidebar />
      <div data-testid="dashboard-content" className="pl-[60px] h-full">
        <div className="flex h-full gap-x-3">
          <OrgSidebar />
          <div className="h-full flex-1">
            <NavBar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
```

3. Created navbar component at /app/(dashboard/\_components/navbar.tsx. and OrgSidebar component at /app/(dashboard)/\_components/orgsidebar.tsx

```tsx
// app/(dashboard)/_components/navbar.tsx
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
```

```tsx
// app/(dashboard)/_components/orgsidebar.tsx
"use client";

export function OrgSidebar() {
  return (
    <div
      className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5"
      data-testid="org-sidebar"
    >
      Org sidebar
    </div>
  );
}
```
