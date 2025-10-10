import express from 'express';
import {addExpense,addBalance,getData, getAllData, getLastBalanceId, getState, getMonthlyBalance, removeExpense} from '../controllers/expenser.js';  

const expenseRouter = express.Router();

expenseRouter.post('/addExpense',addExpense);
expenseRouter.post('/addBalance',addBalance);
expenseRouter.get('/getData',getData);
expenseRouter.get('/getAllData',getAllData);
expenseRouter.get('/getBalanceId',getLastBalanceId);
expenseRouter.post('/getState',getState);
expenseRouter.get('/getMonthlyBalance',getMonthlyBalance);
expenseRouter.post('/removeExpense',removeExpense);

export default expenseRouter;