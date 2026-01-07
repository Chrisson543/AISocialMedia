import SideBar from '@/app/components/SideBar';
import { getUser } from '@/lib/api-helpers';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const user = await getUser();

  return (
    <div className="flex w-full h-full relative">
      <SideBar user={user}/>
      <main className="flex flex-col w-full lg:w-[50%] items-center h-full pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}