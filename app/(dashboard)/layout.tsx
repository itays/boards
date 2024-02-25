import { NavBar } from "./_components/navbar";
import { OrgSidebar } from "./_components/orgsidebar";
import { Sidebar } from "./_components/sidebar/sidebar";

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
