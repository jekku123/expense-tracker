import { selectCurrentToken } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { jwtDecode } from 'jwt-decode';

interface MyToken {
  user: {
    email: string;
  };
}

export function useAuth() {
  const token = useAppSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode<MyToken>(token);
    const { email } = decoded.user;

    return { user: { email } };
  }

  return null;
}
