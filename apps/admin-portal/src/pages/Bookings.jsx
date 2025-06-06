import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [guest, setGuest] = useState({ name: '', phone: '', email: '', idProofUrl: '' });
  const [booking, setBooking] = useState({
    id: null,
    listingId: '', checkinDate: '', checkoutDate: '', plannedCheckinTime: '', actualCheckinTime: '',
    plannedCheckoutTime: '', actualCheckoutTime: '', bookingSource: 'Walk-in',
    paymentStatus: 'unpaid', amountReceived: 0, notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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

  const reset = () => {
    setGuest({ name: '', phone: '', email: '', idProofUrl: '' });
    setSelectedGuestId('');
    setBooking({
      id: null,
      listingId: '', checkinDate: '', checkoutDate: '', plannedCheckinTime: '', actualCheckinTime: '',
      plannedCheckoutTime: '', actualCheckoutTime: '', bookingSource: 'Walk-in',
      paymentStatus: 'unpaid', amountReceived: 0, notes: ''
    });
    setSuccessMsg('');
  };

  const submit = async () => {
    setLoading(true);
    setSuccessMsg('');
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
        amountReceived: parseFloat(booking.amountReceived)
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
      alert("Booking failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bookingToEdit) => {
    setBooking(bookingToEdit);
    setSelectedGuestId(bookingToEdit.guestId.toString());
    // Set guest fields for display (readonly)
    const guestObj = guests.find(g => g.id === bookingToEdit.guestId) || { name: '', phone: '', email: '', idProofUrl: '' };
    setGuest(guestObj);
    setSuccessMsg('');
  };

  return (
    <div>
      <h2>{booking.id ? 'Edit Booking' : 'Create Booking'}</h2>
      {successMsg && (
        <div style={{ color: 'green', marginBottom: '10px' }}>{successMsg}</div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <select value={booking.listingId} onChange={e => setBooking({ ...booking, listingId: e.target.value })}>
          <option value=''>Select Listing</option>
          {listings.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select
          value={selectedGuestId}
          onChange={e => setSelectedGuestId(e.target.value)}
          disabled={!!booking.id} // Disable when editing
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
        <button onClick={submit} disabled={loading}>
          {loading ? 'Saving...' : booking.id ? 'Update Booking' : 'Create Booking'}
        </button>
        {booking.id && <button onClick={reset} disabled={loading}>Cancel</button>}
      </div>

      <table border='1' cellPadding='8' style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Listing</th>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Payment</th>
            <th>Amount</th>
            <th>Source</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => {
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
                <td>
                  <button onClick={() => handleEdit(b)} disabled={loading}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
