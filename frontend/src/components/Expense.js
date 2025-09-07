import React, { useContext, useState } from 'react';
import { BalanceContext } from '../context/BalanceContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Expense = ({ onSuccess }) => {
  const { balanceId, getBalanceID, getState } = useContext(BalanceContext);
  const [form, setForm] = useState({ amount: 0, desc: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/expense/addExpense", {
        ...form,
        balanceId
      });

      if (res.data.success) {
        toast.success("Expense added successfully");
        getBalanceID();
        getState();
        onSuccess();
      } else if (res.data.message === "Insufficient balance") {
        toast.error("Add More Balance");
        toast.error(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow-md w-80">
      <label className="block mb-2 font-semibold">Enter Amount:</label>
      <input 
        type="number" 
        name="amount" 
        value={form.amount===0?"":form.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder='Enter Amount'
      />
      <label className="block mb-2 font-semibold">Enter Desc:</label>
      <input 
        type="text" 
        name="desc"
        value={form.desc}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder='Enter Desc'
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-xl w-full">
        Add Expense
      </button>
    </form>
  );
};

export default Expense;
