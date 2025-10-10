import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BalanceContext } from "../context/BalanceContext";

// helper function to convert month number → month name
const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "long" });
};

const AllExpenses = () => {
    const navigate=useNavigate();
  const [data, setData] = useState([]);
  const {backendurl} =useContext(BalanceContext)

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const res = await axios.get(backendurl+"/api/expense/getAllData");
        if (res.data.success) {
          setData(res.data.data);
          toast.success("All Expenses fetched successfully");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch monthly data");
      }
    };
    fetchMonthlyData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-600 p-6 flex flex-col items-center">
      <ToastContainer />

      {/* Header */}
      <header className="text-white py-6 shadow-md w-screen text-center h-20 mb-10">
        <h1
          className="text-4xl font-extrabold text-white mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          💸 Expense Tracker
        </h1>
      </header>

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
                        className="flex justify-between items-center bg-red-50 px-4 py-2 rounded-lg"
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

export default AllExpenses;
