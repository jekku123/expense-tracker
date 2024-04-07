import { useAuth } from '@/hooks/useAuth';
import { useSendLogoutMutation } from '@/redux/api/authApiSlice';
import { Loader2 } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './header';

export default function Layout() {
  const session = useAuth();
  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header session={session} sendLogout={sendLogout} isLoading={isLoading} />
      <Outlet />
      <Toaster />
    </div>
  );
}
