import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expenseRouter from './routes/expense_router.js';
import connectDB from './config/connectdb.js';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://expense-tracker-1-w7oc.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use('/api/expense', expenseRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
