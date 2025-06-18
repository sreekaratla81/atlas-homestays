import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuestBooking from './pages/GuestBooking';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import Layout from './components/Layout';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:id" element={<ListingDetails />} />
                <Route path="/guest-booking" element={<GuestBooking />} />
            </Route>
        </Routes>
    );
}

export default App;
