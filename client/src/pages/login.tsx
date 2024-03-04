import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import usePersist from '@/hooks/usePersist';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTitle } from '@/hooks/useTitle';
import { useLoginMutation } from '@/redux/api/authApiSlice';
import { setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function Login() {
  useTitle('Login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev: boolean) => !prev);

  return (
    <section className="w-full max-w-xs mx-auto">
      <header>
        <h1>Login</h1>
      </header>
      <main className="">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handleUserInput(e)}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <Button disabled={isLoading} className="">
            Login
          </Button>

          <label htmlFor="persist" className="">
            <input
              type="checkbox"
              className=""
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
}
