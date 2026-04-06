import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardBreadcrumb />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 pt-20 sm:p-5 sm:pt-24 xl:p-6 xl:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
