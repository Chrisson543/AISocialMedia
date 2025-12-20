import SideBar from '@/app/components/SideBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <main className="flex flex-col w-full lg:w-[50%] items-center h-full pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}