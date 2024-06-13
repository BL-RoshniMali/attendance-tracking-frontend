import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from  './auth/Register';
import Login from './auth/Login';
import Dashboard from  './pages/AdminDashboard';
import CandidateDashboard from './pages/CandidateDashboard';


const App = () => {
  return <div>
    <Router>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/candidate-dashboard' element={<CandidateDashboard />}></Route>
      </Routes>
    </Router>
  </div>
}

export default App;
