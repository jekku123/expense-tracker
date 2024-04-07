import { useAuth } from '@/hooks/useAuth';
import { useSendLogoutMutation } from '@/redux/api/authApiSlice';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './header';

export default function Layout() {
  const session = useAuth();
  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  if (isLoading) {
    return <p>Logging out...</p>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header session={session} sendLogout={sendLogout} isLoading={isLoading} />
      <Outlet />
      <Toaster />
    </div>
  );
}
