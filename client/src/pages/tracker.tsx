import CreateTransaction from '@/components/create-transaction';
import { Button } from '@/components/ui/button';
import { useTitle } from '@/hooks/useTitle';
import {
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/redux/api/transactionApiSlice';
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

  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const categories = transactions?.map((transaction: ITransaction) => transaction.category);
  const uniqueCategories = Array.from(new Set(categories));
  console.log(uniqueCategories);

  return (
    <div>
      <h1>Tracker</h1>
      <CreateTransaction />
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{(error as { data: { message: string } }).data!.message}</p>}
        {isSuccess &&
          transactions &&
          transactions.map((transaction: ITransaction) => {
            return (
              <div key={transaction._id}>
                <p>{transaction.title}</p>
                <p>{transaction.amount}</p>
                <p>{transaction.date}</p>
                <p>{transaction.description}</p>
                <p>{transaction.category}</p>
                <p>{transaction.transactionType}</p>

                <Button
                  onClick={() => {
                    updateTransaction({
                      id: transaction._id!,
                      transaction: {
                        title: 'Updated Title',
                        amount: 100,
                        category: 'Updated Category',
                        transactionType: 'Updated Transaction Type',
                      },
                    });
                  }}
                >
                  Update
                </Button>
                <Button onClick={() => deleteTransaction({ id: transaction._id! })}>Delete</Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
