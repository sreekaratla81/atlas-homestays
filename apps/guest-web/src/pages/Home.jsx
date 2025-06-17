import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="text-center">
        <h1 className="display-4">Welcome to Atlas Homestays</h1>
        <p className="lead">Premium Service Apartments in KPHB.</p>
        <Link to="/listings" className="btn btn-primary btn-lg">Browse Listings</Link>
    </div>
);

export default Home;
