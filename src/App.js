import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from  './auth/Register';
import Login from './auth/Login';
import Dashboard from  './pages/Dashboard';


const App = () => {
  return <div>
    <Router>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </Router>
  </div>
}

export default App;
