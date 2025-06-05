import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
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

// 👇 Replace with your actual domain and clientId from Auth0
const domain = "atlashomestays.us.auth0.com";
const clientId = "d70OGzWag10f4viX8DI1SxOXAj6aDsvX";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
