import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="site-header navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
            <Link className="navbar-brand" to="/">Atlas Homestays</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/listings">Listings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/guest-booking">Multi-Listing Booking</Link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
);

export default Header;
