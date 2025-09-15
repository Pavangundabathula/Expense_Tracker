import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BalanceContext = createContext();

const BalanceContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const [balanceId, setBalanceId] = useState(null);
  const backendurl="https://expense-tracker-backend-8o6r.onrender.com";
  // const backendurl="https://localhost:5000";
  const [state, setState] = useState(0);

  const getBalanceID = async () => {
    try {
      const res = await axios.get(backendurl+'/api/expense/getBalanceId');
      if (res.data.success) {   
        setBalanceId(res.data.data); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getState = async () => {
    try {
      if (!balanceId) return;

      console.log("getState: ", balanceId);

      const res = await axios.post(backendurl+"/api/expense/getState", { balanceId });
      if (res.data.success) {  
        setState(res.data.data); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <BalanceContext.Provider value={{ balanceId, state, getBalanceID, getState,backendurl }}>
      {props.children}
    </BalanceContext.Provider>
  );
};

export default BalanceContextProvider;
