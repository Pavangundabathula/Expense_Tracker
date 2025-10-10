import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BalanceContext } from "../context/BalanceContext";

// helper function to convert month number → month name
const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "long" });
};

const MonthlyBalances = () => {
    const navigate=useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const {backendurl} =useContext(BalanceContext)

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const res = await axios.get(backendurl+"/api/expense/getMonthlyBalance");
        if (res.data.success) {
          setMonthlyData(res.data.data);
          toast.success("Monthly data fetched successfully");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ">
      <header className="text-white py-6 shadow-md">
        <h1 className="text-3xl font-extrabold text-center tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          💰 Expense Tracker
        </h1>
      </header>

      <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500 drop-shadow">
          📊 Monthly Balances Overview
        </h2>

        {monthlyData.length === 0 ? (
          <p className="text-center text-gray-600">No data available</p>
        ) : (
          <ul className="space-y-3">
            {monthlyData.map((item, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {getMonthName(item.month)} {item.year}
                  </h3>
                  <p className="text-gray-700">
                    Total Balance:{" "}
                    <span className="font-bold text-green-600">
                      ₹ {item.totalBalance}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MonthlyBalances;
