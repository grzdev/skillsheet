import AppHeader from '@/components/AppHeader';

export default function BuildLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <AppHeader />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
