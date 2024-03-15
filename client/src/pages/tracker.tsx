import CreateTransaction from '@/components/create-transaction';
import TransactionTable from '@/components/transaction-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';
import { getWeekNumber } from '@/lib/utils';
import { useGetAllTransactionsQuery } from '@/redux/api/transactionApiSlice';
import { ITransaction } from '@/types';

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
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // const totalExpenses = transactions?.reduce(
  //   (acc: number, transaction: ITransaction) =>
  //     transaction.transactionType === 'expense' ? acc + transaction.amount : acc,
  //   0
  // );

  const totalExpensesThisMonth = transactions?.reduce(
    (acc: number, transaction: ITransaction) =>
      transaction.transactionType === 'expense' &&
      new Date(transaction.createdAt).getMonth() === new Date().getMonth() &&
      new Date(transaction.createdAt).getFullYear() === new Date().getFullYear()
        ? acc + transaction.amount
        : acc,
    0
  );

  const totalExpensesThisYear = transactions?.reduce(
    (acc: number, transaction: ITransaction) =>
      transaction.transactionType === 'expense' &&
      new Date(transaction.createdAt).getFullYear() === new Date().getFullYear()
        ? acc + transaction.amount
        : acc,
    0
  );

  const totalExpensesThisWeek = transactions?.reduce(
    (acc: number, transaction: ITransaction) =>
      transaction.transactionType === 'expense' &&
      getWeekNumber(new Date(transaction.createdAt)) === getWeekNumber(new Date()) &&
      new Date(transaction.createdAt).getFullYear() === new Date().getFullYear()
        ? acc + transaction.amount
        : acc,
    0
  );

  const totalExpensesToday = transactions?.reduce(
    (acc: number, transaction: ITransaction) =>
      transaction.transactionType === 'expense' &&
      new Date(transaction.createdAt).getDate() === new Date().getDate()
        ? acc + transaction.amount
        : acc,
    0
  );

  return (
    <div className="flex flex-col w-full max-w-6xl gap-6 px-6 py-4 mx-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-bold">Expense Tracker</h1>
        <CreateTransaction />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{totalExpensesToday} €</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{totalExpensesThisWeek} €</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{totalExpensesThisMonth} €</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This year</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{totalExpensesThisYear} €</p>
          </CardContent>
        </Card>
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
