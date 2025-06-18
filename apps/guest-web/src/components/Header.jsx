import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/book">Book Now</Link>
        <Link to="/guest-booking">Multi-Listing Booking</Link>
    </nav>
);

export default Header;
