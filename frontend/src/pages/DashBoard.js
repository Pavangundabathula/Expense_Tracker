// DashBoard.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Balance from "../components/Balance";
import Expense from "../components/Expense";
import { BalanceContext } from "../context/BalanceContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [balanceForm, setBalanceForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState(false);
  const { getBalanceID,balanceId,state,getState } = useContext(BalanceContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expense/getData");

        if (res.data.success) {
          setData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
        setBalanceForm(false);
        setExpenseForm(false); 
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    getBalanceID();
    fetchData();
  }, [balanceId,state,refresh]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center">
      <ToastContainer />

      {/* Header */}
      <header className="text-white py-6 shadow-md w-screen text-center h-20 mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-6" onClick={()=>navigate('/')}>
          💸 Expense Tracker
        </h1>
      </header>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setBalanceForm(!balanceForm);
            setExpenseForm(false);
          }}
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-lg"
        >
          ➕ Add Balance
        </button>
        <button
          onClick={() => {
            setExpenseForm(!expenseForm);
            setBalanceForm(false);
          }}
          className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg"
        >
          ➖ Add Expense
        </button>
        <button
          onClick={()=>navigate('/monthly')}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Monthly Expense
        </button>
      </div>

      {/* Forms */}
      <div className="w-full flex flex-col items-center gap-4">
        {balanceForm && (
          <div className="animate-fadeIn">
            {balanceForm && <Balance onSuccess={() => setRefresh(prev => !prev)} />}
          </div>
        )}
        {expenseForm && (
          <div className="animate-fadeIn">
            {expenseForm && <Expense onSuccess={() => setRefresh(prev => !prev)} />}
          </div>
        )}
      </div>

      {/* Data Display */}
      <div className="w-full max-w-4xl mt-8 space-y-6">
        {data.length > 0 ? (
          data.map((item) => {
            const totalExpenses = item.expenses.reduce(
              (acc, exp) => acc + exp.amount,
              0
            );
            return (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
              >
                {/* Date */}
                <h2 className="text-lg font-bold text-gray-700">
                  📅 {new Date(item.createdAt).toLocaleDateString()}
                </h2>

                {/* Balance */}
                <p className="text-green-700 font-semibold">
                  💰 Balance Added: ₹ {item.amount}
                </p>

                {/* Expenses */}
                <div className="space-y-2">
                  <h3 className="text-red-700 font-semibold">Expenses:</h3>
                  {item.expenses.length > 0 ? (
                    item.expenses.map((exp) => (
                      <div
                        key={exp._id}
                        className="flex justify-between bg-red-50 px-4 py-2 rounded-lg"
                      >
                        <span>{exp.desc}</span>
                        <span className="font-bold">₹ {exp.amount}</span>
                        <span className="text-gray-500 text-sm">{new Date(exp.date).toLocaleDateString()}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No expenses</p>
                  )}
                </div>

                {/* Totals */}
                <p className="text-red-600 font-bold">
                  Total Expenses: ₹ {totalExpenses}
                </p>
                <p className="text-blue-700 font-bold">
                  ✅ Remaining Balance: ₹ {item.state}
                </p>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-white text-lg">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
