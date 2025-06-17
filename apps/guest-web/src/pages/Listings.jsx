import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../config';

const Listings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE}/listings`).then(res => setListings(res.data));
    }, []);

    return (
        <div className="row">
            {listings.map(listing => (
                <div className="col-md-4 mb-4" key={listing.id}>
                    <div className="card h-100">
                        <img src="https://via.placeholder.com/400x300?text=Listing" className="card-img-top" alt={listing.name} />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{listing.name}</h5>
                            <p className="card-text">Sleeps {listing.maxGuests} guests</p>
                            <Link className="btn btn-primary mt-auto" to={`/listings/${listing.id}`}>View Details</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Listings;
