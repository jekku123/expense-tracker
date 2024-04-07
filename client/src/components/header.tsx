import { Button } from '@/components/ui/button';

import { useAuth } from '@/hooks/useAuth';
import { useSendLogoutMutation } from '@/redux/api/authApiSlice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const session = useAuth();

  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <p>Logging out...</p>;
  }
  return (
    <header className="w-full">
      <div className="flex justify-between w-full max-w-6xl px-6 py-4 mx-auto">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tracker">Tracker</Link>
            </li>
          </ul>
        </nav>
        {session ? (
          <>
            <p>Logged in as {session.user.username || session.user.email}</p>
            <Button variant="secondary" disabled={isLoading} onClick={sendLogout}>
              Logout
            </Button>
          </>
        ) : (
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
