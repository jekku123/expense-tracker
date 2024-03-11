import express from 'express';
import { Container } from 'inversify';
import { TransactionController } from '../controllers/transaction.controller';
import { validateToken } from '../middlewares/validateToken';
import { UserService } from '../services/user.service';
import { INTERFACE_TYPE } from '../utils/dependencies';

import Logger from '../services/logger.service';
import { TransactionService } from '../services/transaction.service';
import { ILogger } from '../types/ILogger';
import { ITransactionService } from '../types/ITransactionService';
import { IUserService } from '../types/IUserService';

const router = express.Router();

const container = new Container();

container.bind(INTERFACE_TYPE.TransactionController).to(TransactionController);

container.bind<ILogger>(INTERFACE_TYPE.Logger).to(Logger);
container.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService);
container.bind<ITransactionService>(INTERFACE_TYPE.TransactionService).to(TransactionService);

const controller = container.get<TransactionController>(INTERFACE_TYPE.TransactionController);

router.use(validateToken);

router.get('/', controller.onGetTransactions.bind(controller));
router.post('/', controller.onCreateTransaction.bind(controller));
router.patch('/:id', controller.onUpdateTransaction.bind(controller));
router.delete('/:id', controller.onDeleteTransaction.bind(controller));

export default router;
