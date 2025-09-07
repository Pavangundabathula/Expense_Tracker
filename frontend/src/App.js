import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import MonthlyBalances from './pages/MonthlyBalances'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashBoard/>} />
          <Route path='/monthly' element={<MonthlyBalances/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
