import { useAddNewTransactionMutation } from '@/redux/api/transactionApiSlice';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

import { z } from 'zod';

const categories = [
  {
    id: '1',
    name: 'Food',
  },
  {
    id: '2',
    name: 'Transport',
  },
  {
    id: '3',
    name: 'Entertainment',
  },
  {
    id: '4',
    name: 'Education',
  },
  {
    id: '5',
    name: 'Health',
  },
  {
    id: '6',
    name: 'Other',
  },
];

const transactionSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters long',
  }),
  amount: z.coerce.number().gte(0.05, {
    message: 'Amount must be at least 0.05',
  }),
  category: z.string().min(1, {
    message: 'Must select a category',
  }),
  transactionType: z.enum(['expense', 'income']),
});

export type TransactionForm = z.infer<typeof transactionSchema>;

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateTransaction() {
  const [open, setOpen] = useState(false);
  const [addTransactionNote] = useAddNewTransactionMutation();

  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: 0,
      category: '',
      transactionType: 'expense',
    },
  });

  async function onSubmit(values: TransactionForm) {
    try {
      await addTransactionNote(values).unwrap();
      form.reset();
      toast.success('Transaction added');
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add transaction');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <DialogTrigger asChild>
          <Button variant="outline">
            <span className="mr-2">Create Transaction</span>
            <Plus />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create new transaction</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Transaction type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="expense" />
                        </FormControl>
                        <FormLabel className="font-normal">Expense</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="income" />
                        </FormControl>
                        <FormLabel className="font-normal">Income</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex justify-end gap-2 mt-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
