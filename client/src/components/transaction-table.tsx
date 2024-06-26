import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { ITransaction } from '@/types';
import { DeleteTransaction } from './delete-transaction';
import EditTransaction from './edit-transaction';

export default function TransactionTable({ transactions }: { transactions: ITransaction[] }) {
  return (
    <div className="p-2 pb-4 overflow-x-auto border rounded-md">
      <Table>
        <TableCaption>A list of transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[120px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction: ITransaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className="text-right">{transaction.amount} €</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <EditTransaction transaction={transaction} />
                  <DeleteTransaction transactionId={transaction._id!} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
