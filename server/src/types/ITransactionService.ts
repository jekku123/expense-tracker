import { ITransaction } from '../models/transaction';

export interface ITransactionService {
  getTransactions(userId: string): Promise<ITransaction[]>;
  createTransaction(transaction: ITransaction): Promise<ITransaction>;
  updateTransaction(id: string, transaction: ITransaction): Promise<ITransaction | null>;
  deleteTransaction(id: string): Promise<ITransaction | null>;
}
