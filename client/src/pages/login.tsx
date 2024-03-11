import { Link, useNavigate } from 'react-router-dom';

import usePersist from '@/hooks/usePersist';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTitle } from '@/hooks/useTitle';
import { useLoginMutation } from '@/redux/api/authApiSlice';
import { setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, {
    message: 'Please enter a password',
  }),
  persist: z.boolean().default(false).optional(),
});

const defaultValues = {
  email: '',
  password: '',
};

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  useTitle('Login');

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const [serverError, setServerError] = useState<string | undefined>(undefined);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      setServerError(undefined);
      const { accessToken } = await login(values).unwrap();
      dispatch(setCredentials({ accessToken }));
      toast('Logged in successfully');
      navigate('/tracker');
    } catch (e) {
      const err = e as { data: { errors: { message: string } } };
      setServerError(err?.data?.errors?.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-6 px-6 py-4 mx-auto grow">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Login in to access the app</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {serverError && <p className="text-center text-md text-destructive">{serverError}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.email
                            ? 'border-destructive focus-visible:ring-destructive'
                            : ''
                        }
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={
                          form.formState.errors.password
                            ? 'border-destructive focus-visible:ring-destructive'
                            : ''
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="persist"
                  checked={persist}
                  onCheckedChange={() => setPersist((prev: boolean) => !prev)}
                />
                <Label htmlFor="persist">Remember login?</Label>
              </div>

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                Login
                {form.formState.isSubmitting && <Loader className="ml-2 animate-spin" />}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center">
            Dont have an account?{' '}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
