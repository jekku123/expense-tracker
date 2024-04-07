import CreateTransaction from '@/components/create-transaction';
import TransactionTable from '@/components/transaction-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';
import { getWeekNumber } from '@/lib/utils';
import { useGetAllTransactionsQuery } from '@/redux/api/transactionApiSlice';
import { ITransaction } from '@/types';
import { useMemo } from 'react';

export default function Tracker() {
  useTitle('Tracker');

  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllTransactionsQuery('transactions', {
    // pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
  });

  // const totalExpenses = transactions?.reduce(
  //   (acc: number, transaction: ITransaction) =>
  //     transaction.transactionType === 'expense' ? acc + transaction.amount : acc,
  //   0
  // );

  const totalExpensesThisMonth = useMemo(() => {
    return transactions?.reduce(
      (acc: number, transaction: ITransaction) =>
        transaction.transactionType === 'expense' &&
        new Date(transaction.createdAt).getMonth() === new Date().getMonth() &&
        new Date(transaction.createdAt).getFullYear() === new Date().getFullYear()
          ? acc + transaction.amount
          : acc,
      0
    );
  }, [transactions]);

  const totalExpensesThisYear = useMemo(() => {
    return transactions?.reduce(
      (acc: number, transaction: ITransaction) =>
        transaction.transactionType === 'expense' &&
        new Date(transaction.createdAt).getFullYear() === new Date().getFullYear()
          ? acc + transaction.amount
          : acc,
      0
    );
  }, [transactions]);

  const totalExpensesThisWeek = useMemo(() => {
    return transactions?.reduce(
      (acc: number, transaction: ITransaction) =>
        transaction.transactionType === 'expense' &&
        getWeekNumber(new Date(transaction.createdAt)) === getWeekNumber(new Date()) &&
        new Date(transaction.createdAt).getFullYear() === new Date().getFullYear()
          ? acc + transaction.amount
          : acc,
      0
    );
  }, [transactions]);

  const totalExpensesToday = useMemo(() => {
    return transactions?.reduce(
      (acc: number, transaction: ITransaction) =>
        transaction.transactionType === 'expense' &&
        new Date(transaction.createdAt).getDate() === new Date().getDate()
          ? acc + transaction.amount
          : acc,
      0
    );
  }, [transactions]);

  return (
    <div className="flex flex-col w-full max-w-6xl gap-6 px-6 py-4 mx-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-bold">Expense Tracker</h1>
        <CreateTransaction />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Today" value={totalExpensesToday!} />
        <SummaryCard title="This week" value={totalExpensesThisWeek!} />
        <SummaryCard title="This month" value={totalExpensesThisMonth!} />
        <SummaryCard title="This year" value={totalExpensesThisYear!} />
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{(error as { data: { message: string } }).data!.message}</p>}
        {isSuccess && transactions && (
          <TransactionTable transactions={transactions as ITransaction[]} />
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{value} €</p>
      </CardContent>
    </Card>
  );
}
