import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../config';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE}/listings/${id}`).then(res => setListing(res.data));
    }, [id]);

    if (!listing) return <p>Loading...</p>;

    return (
        <div className="card">
            <img src="https://via.placeholder.com/800x400?text=Listing" className="card-img-top" alt={listing.name} />
            <div className="card-body">
                <h3 className="card-title">{listing.name}</h3>
                <p className="card-text">Type: {listing.type}</p>
                <p className="card-text">Max Guests: {listing.maxGuests}</p>
            </div>
        </div>
    );
};

export default ListingDetails;
