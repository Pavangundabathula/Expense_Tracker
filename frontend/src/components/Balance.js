import React, { useContext, useState } from 'react';
import { BalanceContext } from '../context/BalanceContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Balance = ({ onSuccess }) => {
  const { getBalanceID, getState, state, balanceId,backendurl } = useContext(BalanceContext);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true; 

      const res = await axios.post(backendurl+"/api/expense/addBalance", { amount });

      if (res.data.success) {  
        toast.success("Balance added successfully");
        getBalanceID();
        getState();
        onSuccess();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow-md w-80">
      <label className="block mb-2 font-semibold">Enter Balance:</label>
      <input 
        type="number" 
        value={amount === 0 ? "" : amount} 
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border rounded mb-4"
        placeholder='Enter Balance'
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full">
        Add Balance
      </button>
    </form>
  );
};

export default Balance;
