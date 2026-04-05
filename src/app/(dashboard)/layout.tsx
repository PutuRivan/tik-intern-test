import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-background p-6">
        {children}
      </main>
    </div>
  );
}