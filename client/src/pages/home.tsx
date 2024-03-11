import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { Link } from 'react-router-dom';

export default function Home() {
  useTitle('Home');
  const session = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-6 px-6 py-4 mx-auto grow">
      <h1 className="font-semibold text-7xl">Expense Tracker</h1>
      <p className="text-lg text-muted-foreground">
        Welcome to the Expense Tracker app! This app is a simple way to keep track of your expenses.
      </p>
      {session ? (
        <Button>
          <Link to="/tracker">Go to Tracker</Link>
        </Button>
      ) : (
        <div className="flex gap-4">
          <Button>
            <Link to="/register">Register</Link>
          </Button>
          <Button variant="secondary">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
