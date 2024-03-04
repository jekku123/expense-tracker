import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAddNewTransactionMutation } from '@/redux/api/transactionApiSlice';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function CreateTransaction() {
  const [addTransactionNote] = useAddNewTransactionMutation();

  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    transactionType: 'expense',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ ...formData, date: date?.toISOString() });
    try {
      const response = await addTransactionNote({ ...formData, date: date?.toISOString() });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>Create Transaction</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="title" placeholder="Title" onChange={handleFormChange} />
        <Input type="text" name="amount" placeholder="Amount" onChange={handleFormChange} />
        <Input
          type="text"
          name="description"
          placeholder="Description (optional)"
          onChange={handleFormChange}
        />
        <Input type="text" name="category" placeholder="Category" onChange={handleFormChange} />
        <RadioGroup
          className="flex gap-4"
          name="transactionType"
          onChange={handleFormChange}
          defaultValue="expense"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense">Expense</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income">Income</Label>
          </div>
        </RadioGroup>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        {/* <Input
          type="text"
          name="transactionType"
          placeholder="Transaction Type"
          onChange={handleFormChange}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

// "title": "kekeasdadsdas",
// "amount": "100",
// "category": "stuffss",
// "transactionType": "income",
// "userId": "65e3b3ff50c6f03707bd5fab"
