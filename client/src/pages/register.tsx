import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const response = await axios.post('http://localhost:8080/api/auth/register', {
      //   email,
      //   password,
      // });
      // const data = response.data;
      // console.log(data);
      console.log(`Registering with email: ${email} and password: ${password}`);
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl">Register</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto mt-4 space-y-6">
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
