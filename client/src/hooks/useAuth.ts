import { selectCurrentToken } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { IUser } from '@/types';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const token = useAppSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode<IUser>(token);
    const { email, username } = decoded.user;

    return { user: { username, email } };
  }

  return null;
}
