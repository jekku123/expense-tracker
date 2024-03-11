type TransactionType = 'income' | 'expense';

export interface ITransaction {
  _id?: string;
  title: string;
  amount: number;
  description: string;
  category: string;
  transactionType: TransactionType;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface IUser {
  user: {
    username: string;
    email: string;
  };
}
