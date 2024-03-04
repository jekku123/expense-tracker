import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ITransactionService } from '../types/ITransactionService';
import { INTERFACE_TYPE } from '../utils/dependencies';

@injectable()
export class TransactionController {
  private transactionService: ITransactionService;

  constructor(@inject(INTERFACE_TYPE.TransactionService) transactionService: ITransactionService) {
    this.transactionService = transactionService;
  }

  /**
   * @route GET /api/transactions
   * @desc Get all transactions
   * @access Private
   */
  async onGetTransactions(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    try {
      const transactions = await this.transactionService.getTransactions(userId);
      res.status(200).send(transactions);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route POST /api/transactions
   * @desc Create a new transaction
   * @access Private
   */
  async onCreateTransaction(req: Request, res: Response, next: NextFunction) {
    const transaction = req.body;
    const userId = req.user?.id;

    transaction.userId = userId;

    try {
      const newTransaction = await this.transactionService.createTransaction(transaction);
      res.status(201).send(newTransaction);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route PATCH /api/transactions/:id
   * @desc Update a transaction
   * @access Private
   */
  async onUpdateTransaction(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const transaction = req.body;
    try {
      const updatedTransaction = await this.transactionService.updateTransaction(id, transaction);
      res.status(200).send(updatedTransaction);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route DELETE /api/transactions/:id
   * @desc Delete a transaction
   * @access Private
   */
  async onDeleteTransaction(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const deletedTransaction = await this.transactionService.deleteTransaction(id);
      res.status(200).send(deletedTransaction);
    } catch (error) {
      next(error);
    }
  }
}
