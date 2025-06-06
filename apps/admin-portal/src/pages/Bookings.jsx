import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../style.css';

const Bookings = () => {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [guest, setGuest] = useState({ name: '', phone: '', email: '', idProofUrl: '' });
  const today = new Date().toISOString().slice(0, 10);
  const [booking, setBooking] = useState({
    id: null,
    listingId: '',
    checkinDate: '',
    checkoutDate: '',
    plannedCheckinTime: '',
    actualCheckinTime: '',
    plannedCheckoutTime: '',
    actualCheckoutTime: '',
    bookingSource: 'Walk-in',
    paymentStatus: 'unpaid',
    amountReceived: 0,
    notes: '',
    createdAt: today,      // Default to today
    paymentDate: today     // Default to today
  });
  const [filters, setFilters] = useState({
    listing: '',
    guest: '',
    paymentStatus: '',
  });
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const messageRef = useRef(null);

  const timeOptions = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE}/listings`).then(res => setListings(res.data));
    axios.get(`${import.meta.env.VITE_API_BASE}/bookings`).then(res => setBookings(res.data));
    axios.get(`${import.meta.env.VITE_API_BASE}/guests`).then(res => setGuests(res.data));
  }, []);

  useEffect(() => {
    if (successMsg || errorMsg) {
      messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [successMsg, errorMsg]);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const reset = () => {
    setGuest({ name: '', phone: '', email: '', idProofUrl: '' });
    setSelectedGuestId('');
    setBooking({
      id: null,
      listingId: '',
      checkinDate: '',
      checkoutDate: '',
      plannedCheckinTime: '',
      actualCheckinTime: '',
      plannedCheckoutTime: '',
      actualCheckoutTime: '',
      bookingSource: 'Walk-in',
      paymentStatus: 'unpaid',
      amountReceived: 0,
      notes: '',
      createdAt: today,
      paymentDate: today
    });
    setSuccessMsg('');
    setErrorMsg('');
  };

  const submit = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      let guestId = selectedGuestId;
      if (guestId === '') {
        // Create new guest
        const guestRes = await axios.post(`${import.meta.env.VITE_API_BASE}/guests`, guest);
        guestId = guestRes.data.id;
      }
      // Always ensure guestId is a number
      guestId = Number(guestId);

      let payload = {
        ...booking,
        guestId,
        listingId: parseInt(booking.listingId),
        amountReceived: parseFloat(booking.amountReceived),
        createdAt: booking.createdAt,
        paymentDate: booking.paymentDate
      };
      // Remove id if it's null or undefined (for create)
      if (!booking.id) {
        const { id, ...rest } = payload;
        payload = rest;
      }
      if (booking.id) {
        await axios.put(`${import.meta.env.VITE_API_BASE}/bookings/${booking.id}`, payload);
        setSuccessMsg('Booking updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE}/bookings`, payload);
        setSuccessMsg('Booking created successfully!');
      }
      reset();
      const updated = await axios.get(`${import.meta.env.VITE_API_BASE}/bookings`);
      setBookings(updated.data);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || err.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bookingToEdit) => {
    setBooking({
      id: bookingToEdit.id,
      listingId: bookingToEdit.listingId || '',
      checkinDate: bookingToEdit.checkinDate || '',
      checkoutDate: bookingToEdit.checkoutDate || '',
      plannedCheckinTime: bookingToEdit.plannedCheckinTime || '',
      actualCheckinTime: bookingToEdit.actualCheckinTime || '',
      plannedCheckoutTime: bookingToEdit.plannedCheckoutTime || '',
      actualCheckoutTime: bookingToEdit.actualCheckoutTime || '',
      bookingSource: bookingToEdit.bookingSource || 'Walk-in',
      paymentStatus: bookingToEdit.paymentStatus || 'unpaid',
      amountReceived: bookingToEdit.amountReceived ?? 0,
      notes: bookingToEdit.notes || '',
      createdAt: bookingToEdit.createdAt || today,
      paymentDate: bookingToEdit.paymentDate || today
    });
    setSelectedGuestId(bookingToEdit.guestId.toString());
    const guestObj = guests.find(g => g.id === bookingToEdit.guestId) || { name: '', phone: '', email: '', idProofUrl: '' };
    setGuest(guestObj);
    setSuccessMsg('');
  };

  // Filtering logic
  const filteredBookings = bookings.filter(b => {
    const guestObj = guests.find(g => g.id === b.guestId) || {};
    const listingObj = listings.find(l => l.id === b.listingId) || {};
    return (
      (!filters.listing || listingObj.name?.toLowerCase().includes(filters.listing.toLowerCase())) &&
      (!filters.guest || guestObj.name?.toLowerCase().includes(filters.guest.toLowerCase())) &&
      (!filters.paymentStatus || b.paymentStatus === filters.paymentStatus)
    );
  });

  // Sorting logic
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!sortField) return 0;
    let aValue, bValue;
    if (sortField === 'checkinDate') {
      aValue = a.checkinDate;
      bValue = b.checkinDate;
    } else if (sortField === 'amountReceived') {
      aValue = a.amountReceived;
      bValue = b.amountReceived;
    } else if (sortField === 'createdAt') {
      aValue = a.createdAt;
      bValue = b.createdAt;
    } else if (sortField === 'paymentDate') {
      aValue = a.paymentDate;
      bValue = b.paymentDate;
    } else {
      return 0;
    }
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h2>{booking.id ? 'Edit Booking' : 'Create Booking'}</h2>
      <div ref={messageRef}>
        {successMsg && (
          <div style={{ color: 'green', marginBottom: '10px' }}>{successMsg}</div>
        )}
        {errorMsg && (
          <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>
        )}
      </div>
      <div className="booking-card">
        <div className="form-grid">
          <select value={booking.listingId} onChange={e => setBooking({ ...booking, listingId: e.target.value })}>
            <option value=''>Select Listing</option>
            {listings.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <select
            value={selectedGuestId}
            onChange={e => setSelectedGuestId(e.target.value)}
            disabled={Boolean(booking.id)}
          >
            <option value=''>New Guest</option>
            {guests.map(g => (
              <option key={g.id} value={g.id}>{g.name} ({g.phone})</option>
            ))}
          </select>
          {!selectedGuestId && (
            <>
              <input
                placeholder='Guest Name'
                value={guest.name}
                onChange={e => setGuest({ ...guest, name: e.target.value })}
                disabled={!!selectedGuestId || !!booking.id}
              />
              <input
                placeholder='Phone'
                value={guest.phone}
                onChange={e => setGuest({ ...guest, phone: e.target.value })}
                disabled={!!selectedGuestId || !!booking.id}
              />
              <input
                placeholder='Email'
                value={guest.email}
                onChange={e => setGuest({ ...guest, email: e.target.value })}
                disabled={!!selectedGuestId || !!booking.id}
              />
              <input
                placeholder='ID Proof URL'
                value={guest.idProofUrl}
                onChange={e => setGuest({ ...guest, idProofUrl: e.target.value })}
                disabled={!!selectedGuestId || !!booking.id}
              />
            </>
          )}
          <input type='date' value={booking.checkinDate} onChange={e => setBooking({ ...booking, checkinDate: e.target.value })} />
          <input type='date' value={booking.checkoutDate} onChange={e => setBooking({ ...booking, checkoutDate: e.target.value })} />
          <select
            value={booking.plannedCheckinTime}
            onChange={e => setBooking({ ...booking, plannedCheckinTime: e.target.value })}
          >
            <option value="">Planned In Time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={booking.actualCheckinTime}
            onChange={e => setBooking({ ...booking, actualCheckinTime: e.target.value })}
          >
            <option value="">Actual In Time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={booking.plannedCheckoutTime}
            onChange={e => setBooking({ ...booking, plannedCheckoutTime: e.target.value })}
          >
            <option value="">Planned Out Time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={booking.actualCheckoutTime}
            onChange={e => setBooking({ ...booking, actualCheckoutTime: e.target.value })}
          >
            <option value="">Actual Out Time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input placeholder='Booking Source' value={booking.bookingSource} onChange={e => setBooking({ ...booking, bookingSource: e.target.value })} />
          <input placeholder='Payment Status' value={booking.paymentStatus} onChange={e => setBooking({ ...booking, paymentStatus: e.target.value })} />
          <input placeholder='Amount Received' value={booking.amountReceived} onChange={e => setBooking({ ...booking, amountReceived: e.target.value })} />
          <input placeholder='Notes' value={booking.notes} onChange={e => setBooking({ ...booking, notes: e.target.value })} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="booking-btn" onClick={submit} disabled={loading}>
            {loading ? 'Saving...' : booking.id ? 'Update Booking' : 'Create Booking'}
          </button>
          {booking.id && <button className="booking-btn booking-btn-cancel" onClick={reset} disabled={loading}>Cancel</button>}
        </div>
      </div>
      {!booking.id && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          <input
            type="date"
            value={booking.createdAt}
            onChange={e => setBooking({ ...booking, createdAt: e.target.value })}
            placeholder="Created At"
            style={{ marginRight: 8 }}
          />
          <input
            type="date"
            value={booking.paymentDate}
            onChange={e => setBooking({ ...booking, paymentDate: e.target.value })}
            placeholder="Payment Date"
            style={{ marginRight: 8 }}
          />
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Filter by Listing"
          value={filters.listing}
          onChange={e => setFilters(f => ({ ...f, listing: e.target.value }))}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Filter by Guest"
          value={filters.guest}
          onChange={e => setFilters(f => ({ ...f, guest: e.target.value }))}
          style={{ marginRight: 8 }}
        />
        <select
          value={filters.paymentStatus}
          onChange={e => setFilters(f => ({ ...f, paymentStatus: e.target.value }))}
          style={{ marginRight: 8 }}
        >
          <option value="">All Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partial</option>
        </select>
        <button onClick={() => {
          setSortField('checkinDate');
          setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        }}>
          Sort by Check-in {sortField === 'checkinDate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button onClick={() => {
          setSortField('amountReceived');
          setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        }}>
          Sort by Amount {sortField === 'amountReceived' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button onClick={() => {
          setSortField('createdAt');
          setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        }}>
          Sort by Created {sortField === 'createdAt' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button onClick={() => {
          setSortField('paymentDate');
          setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        }}>
          Sort by Payment Date {sortField === 'paymentDate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Listing</th>
              <th>Guest</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Source</th>
              <th>Created At</th>
              <th>Payment Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map(b => {
              const guestObj = guests.find(g => g.id === b.guestId) || {};
              const listingObj = listings.find(l => l.id === b.listingId) || {};
              return (
                <tr key={b.id}>
                  <td>{listingObj.name || b.listingId}</td>
                  <td>
                    {guestObj.name || ''}<br />
                    {guestObj.phone || ''}<br />
                    {guestObj.email || ''}
                  </td>
                  <td>{b.checkinDate}</td>
                  <td>{b.checkoutDate}</td>
                  <td>{b.paymentStatus}</td>
                  <td>{b.amountReceived}</td>
                  <td>{b.bookingSource}</td>
                  <td>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}</td>
                  <td>{b.paymentDate ? new Date(b.paymentDate).toLocaleDateString() : ''}</td>
                  <td>
                    <button onClick={() => handleEdit(b)} disabled={loading}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
