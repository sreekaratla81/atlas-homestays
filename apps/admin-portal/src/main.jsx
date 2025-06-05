import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Properties from './pages/Properties';
import Listings from './pages/Listings';
import Bookings from './pages/Bookings';
import './style.css';

const App = () => (
  <BrowserRouter>
    <nav>
      <Link to="/">Properties</Link>
      <Link to="/listings">Listings</Link>
      <Link to="/bookings">Bookings</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Properties />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
