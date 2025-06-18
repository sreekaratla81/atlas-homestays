// File: src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Basic hero section without external image dependency
const Home = () => (
  <div className="text-center py-5 bg-light">
    <h1 className="display-4 mb-3">Welcome to Atlas Homestays</h1>
    <p className="lead mb-4">Premium Service Apartments in KPHB.</p>
    <Link to="/listings" className="btn btn-primary btn-lg">
      Browse Listings
    </Link>
  </div>
);

export default Home;
