import { inject, injectable } from 'inversify';

import Transaction, { ITransaction } from '../models/transaction';
import { ILogger } from '../types/ILogger';
import { ITransactionService } from '../types/ITransactionService';
import { INTERFACE_TYPE } from '../utils/dependencies';
import AppError from '../utils/errors/AppError';
import { ERROR_MESSAGES } from '../utils/errors/errorMessages';
import { STATUS_CODES } from '../utils/errors/statusCodes';

@injectable()
export class TransactionService implements ITransactionService {
  private logger: ILogger;

  constructor(@inject(INTERFACE_TYPE.Logger) logger: ILogger) {
    this.logger = logger;
  }

  async getTransactions(userId: string): Promise<ITransaction[]> {
    const transactions = await Transaction.find({ userId });
    if (!transactions) {
      throw new AppError('Transactions not found', 404);
    }
    return transactions;
  }

  async createTransaction(transaction: ITransaction): Promise<ITransaction> {
    const newTransaction = await Transaction.create(transaction);
    this.logger.info(`Transaction with id ${newTransaction.id} created`, TransactionService.name);
    return newTransaction;
  }

  async updateTransaction(id: string, transaction: ITransaction): Promise<ITransaction | null> {
    const foundTransaction = await Transaction.findById(id);

    if (!foundTransaction) {
      throw new AppError('Transaction not found', 404);
    }

    const updatedTransaction = await foundTransaction.updateOne(transaction);

    if (!updatedTransaction) {
      throw new AppError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    return updatedTransaction;
  }

  async deleteTransaction(id: string): Promise<ITransaction | null> {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      throw new AppError('Transaction not found', 404);
    }
    return deletedTransaction;
  }
}
