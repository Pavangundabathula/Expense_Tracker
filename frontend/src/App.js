import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import MonthlyBalances from './pages/MonthlyBalances'
import AllExpenses from './pages/AllExpenses'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashBoard/>} />
          <Route path='/monthly' element={<MonthlyBalances/>} />
          <Route path='/allExpenses' element={<AllExpenses/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
