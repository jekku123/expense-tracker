import usePersist from '@/hooks/usePersist';
import { useRefreshMutation } from '@/redux/api/authApiSlice';
import { selectCurrentToken } from '@/redux/features/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] = useRefreshMutation();

  useEffect(() => {
    // Why live like this?
    if (effectRan.current === true || import.meta.env.VITE_NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          await refresh({});
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = null;
  } else if (isError) {
    content = <Outlet />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
}
