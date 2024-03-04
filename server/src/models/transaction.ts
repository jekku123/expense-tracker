import mongoose, { Model, Schema } from 'mongoose';

interface TransactionMethods {}

type TransactionModel = Model<ITransaction, {}, TransactionMethods>;

type TransactionType = 'income' | 'expense';

export interface ITransaction {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  transactionType: TransactionType;
  date?: Date;
  userId: Schema.Types.ObjectId;
  _createdAt: Date;
}

const transactionSchema = new Schema<ITransaction, TransactionModel, TransactionMethods>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      default: 0,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
    },

    description: {
      type: String,
    },

    transactionType: {
      type: String,
      required: [true, 'Transaction Type is required'],
    },

    date: {
      type: Date,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId is required'],
    },
  },
  { timestamps: true }
);

// transactionSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await Bun.password.hash(this.password);
//   }
//   next();
// });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
