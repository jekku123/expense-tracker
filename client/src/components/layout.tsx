import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './header';

export default function Layout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
