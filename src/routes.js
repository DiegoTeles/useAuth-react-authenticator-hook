import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';

const RouterWrapper = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<ProtectedRoute />}>
          <Route exact path='/' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterWrapper;
