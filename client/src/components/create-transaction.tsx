import { useAddNewTransactionMutation } from '@/redux/api/transactionApiSlice';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function CreateTransaction() {
  const [addTransactionNote, { isLoading, isSuccess, isError, error }] =
    useAddNewTransactionMutation();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    transactionType: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await addTransactionNote(formData);
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
        <Input type="text" name="category" placeholder="Category" onChange={handleFormChange} />
        <Input
          type="text"
          name="transactionType"
          placeholder="Transaction Type"
          onChange={handleFormChange}
        />
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
