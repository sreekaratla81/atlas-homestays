// File: src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const heroStyle = {
  background: 'url("/hero.jpg") center center/cover no-repeat',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: '#fff',
  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
  position: 'relative',
  padding: '48px 16px'
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.45)',
  zIndex: 1
};

const contentStyle = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center'
};

const Home = () => (
  <section style={heroStyle}>
    <div style={overlayStyle}></div>
    <div style={contentStyle}>
      <h1 className="display-4 mb-3">Welcome to Atlas Homestays</h1>
      <p className="lead mb-4">Premium Service Apartments in KPHB.</p>
      <Link to="/listings" className="btn btn-primary btn-lg">
        Browse Listings
      </Link>
    </div>
  </section>
);

export default Home;
