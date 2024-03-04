import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'reflect-metadata';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth';

import transactionRoutes from './routes/transaction';
import userRoutes from './routes/user';
import { corsOptions } from './utils/corsOptions';

const app = express();

const PORT = Bun.env.PORT || 8080;
const MONGO_URI = Bun.env.MONGO_URI as string;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(corsOptions));

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
