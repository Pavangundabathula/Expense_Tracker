import express from 'express';
import {addExpense,addBalance,getData, getLastBalanceId, getState, getMonthlyBalance} from '../controllers/expenser.js';  

const expenseRouter = express.Router();

expenseRouter.post('/addExpense',addExpense);
expenseRouter.post('/addBalance',addBalance);
expenseRouter.get('/getData',getData);
expenseRouter.get('/getBalanceId',getLastBalanceId);
expenseRouter.post('/getState',getState);
expenseRouter.get('/getMonthlyBalance',getMonthlyBalance);

export default expenseRouter;