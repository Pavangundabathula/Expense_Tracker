import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expenseRouter from './routes/expense_router.js';
import connectDB from './config/connectdb.js';
import cors from 'cors';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));


connectDB();

app.use('/api/expense', expenseRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
