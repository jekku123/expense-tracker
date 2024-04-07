import { Button } from '@/components/ui/button';

import { IAuth } from '@/types';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from '@reduxjs/toolkit/query';
import { MutationTrigger } from 'node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';
import { Link } from 'react-router-dom';

export default function Header({
  session,
  sendLogout,
  isLoading,
}: {
  session: IAuth | null;
  sendLogout: MutationTrigger<
    MutationDefinition<
      unknown,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      'Transactions' | 'User',
      unknown,
      'api'
    >
  >;
  isLoading: boolean;
}) {
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
            <p className="hidden md:flex">
              Logged in as {session.user.username || session.user.email}
            </p>
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
