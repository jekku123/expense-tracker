import { useSendLogoutMutation } from '@/redux/api/authApiSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export default function Logout() {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  return (
    <Button variant="secondary" disabled={isLoading} onClick={sendLogout}>
      Logout
    </Button>
  );
}
