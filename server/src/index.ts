import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth';

import { corsOptions } from './config/corsOptions';
import transactionRoutes from './routes/transaction';
import userRoutes from './routes/user';

const app = express();

const PORT = Bun.env.PORT || 4000;
const MONGO_URI = Bun.env.MONGO_URI as string;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB and listening on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
