import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTitle } from '@/hooks/useTitle';
import { useCreateUserMutation } from '@/redux/api/userApiSlice';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const registerFormSchema = z
  .object({
    // username: z.string().min(1, {
    //   message: 'Please enter a username',
    // }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter a password',
      })
      .min(4, {
        message: 'Password must be at least 4 characters',
      }),
    confirmPassword: z.string().min(1, {
      message: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  useTitle('Register');

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  const [createUser] = useCreateUserMutation();

  const [serverError, setServerError] = useState<string | undefined>(undefined);

  async function onSubmit(values: RegisterFormValues) {
    try {
      setServerError(undefined);
      await createUser(values).unwrap();
      toast.success('Account created successfully');
      navigate('/login');
    } catch (e) {
      const err = e as { data: { errors: { message: string } } };
      setServerError(err?.data?.errors?.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-6 px-6 py-4 mx-auto grow">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>And start keeping track of your expenses!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {serverError && <p className="text-center text-destructive text-md">{serverError}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              {/* <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                <Input
                className={
                  form.formState.errors.username
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
                }
                {...field}
                />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              /> */}
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={
                          form.formState.errors.confirmPassword
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
              <Button
                type="submit"
                className="w-full my-4"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                Create account
                {form.formState.isSubmitting && <Loader className="ml-2 animate-spin" />}
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
