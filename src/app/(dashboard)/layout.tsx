import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* pt-14 only on mobile to account for hamburger bar */}
        <main className="flex-1 p-6 pt-20 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}