export interface ITransaction {
  _id?: string;
  date?: string;
  title: string;
  amount: number;
  description: string;
  category: string;
  transactionType: string;
  _createdAt?: string;
  _updatedAt?: string;
  userId: string;
}
