import CreateTransaction from '@/components/create-transaction';
import { Button } from '@/components/ui/button';
import {
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/redux/api/transactionApiSlice';
import { ITransaction } from '@/types';

export default function Tracker() {
  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllTransactionsQuery('transactionList', {
    // pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [
    updateTransaction,
    { isLoading: isUpdLoading, isSuccess: isUpdSuccess, isError: isUpdError, error: updError },
  ] = useUpdateTransactionMutation();

  const [deleteTransaction, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] =
    useDeleteTransactionMutation();

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTransaction({ id });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(transactions);

  return (
    <div>
      <h1>Tracker</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error}</p>}
        {isSuccess &&
          transactions &&
          transactions.map((transaction: ITransaction) => {
            return (
              <div key={transaction._id}>
                <p>{transaction.title}</p>
                <p>{transaction.amount}</p>
                <p>{transaction.category}</p>
                <p>{transaction.transactionType}</p>

                <Button onClick={() => handleDelete(transaction._id!)}>Delete</Button>
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
              </div>
            );
          })}
      </div>
      <CreateTransaction />
    </div>
  );
}
