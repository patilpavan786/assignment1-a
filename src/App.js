import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fetch from './Fetch';
import Home from './Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Fetch' element={<Fetch />} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
