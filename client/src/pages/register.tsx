import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTitle } from '@/hooks/useTitle';
import { useCreateUserMutation } from '@/redux/api/userApiSlice';

import { useState } from 'react';

export default function Register() {
  useTitle('Register');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [createUser] = useCreateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser(formData);
      console.log('User registered');
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl">Register</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto mt-4 space-y-6">
        <Input placeholder="Username" name="username" onChange={handleChange} />
        <Input placeholder="Email" name="email" onChange={handleChange} />
        <Input placeholder="Password" type="password" name="password" onChange={handleChange} />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
