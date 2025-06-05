import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Properties from './pages/Properties';
import Listings from './pages/Listings';
import Bookings from './pages/Bookings';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  const allowedAdmins = ["atlashomeskphb@gmail.com"];
  const isAuthorized = isAuthenticated && allowedAdmins.includes(user?.email);

  return (
    <BrowserRouter>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/properties">Properties</Link>{' '}
        <Link to="/listings">Listings</Link>{' '}
        <Link to="/">Bookings</Link>{' '}
        {isAuthenticated ? (
          <>
            <span style={{ marginLeft: 10 }}>👋 {user?.name}</span>{' '}
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()} style={{ marginLeft: 10 }}>
            Login
          </button>
        )}
      </nav>

      {isAuthorized ? (
        <Routes>
          <Route path="/" element={<Bookings />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>
      ) : isAuthenticated ? (
        <p style={{ padding: '1rem', color: 'crimson' }}>
          🚫 You are not authorized to access this portal.
        </p>
      ) : (
        <p style={{ padding: '1rem' }}>
          🔐 Please log in to access the admin panel.
        </p>
      )}
    </BrowserRouter>
  );
};

export default App;
