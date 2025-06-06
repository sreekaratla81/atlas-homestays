import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    name: '', propertyId: '', floor: '', type: '', status: 'active',
    wifiName: '', wifiPassword: '', maxGuests: '',
    checkInTime: '', checkOutTime: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const [listRes, propRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_BASE}/listings`),
      axios.get(`${import.meta.env.VITE_API_BASE}/properties`)
    ]);
    setListings(listRes.data);
    setProperties(propRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      name: '', propertyId: '', floor: '', type: '', status: 'active',
      wifiName: '', wifiPassword: '', maxGuests: '',
      checkInTime: '', checkOutTime: ''
    });
    setEditId(null);
  };

  const submit = () => {
    const payload = {
      ...form,
      propertyId: parseInt(form.propertyId),
      floor: parseInt(form.floor),
      maxGuests: parseInt(form.maxGuests)
    };
    const url = `${import.meta.env.VITE_API_BASE}/listings`;
    if (editId) {
      axios.put(`${url}/${editId}`, payload).then(() => { resetForm(); fetchData(); });
    } else {
      axios.post(url, payload).then(() => { resetForm(); fetchData(); });
    }
  };

  const edit = (l) => {
    setForm({ ...l, propertyId: l.propertyId.toString() });
    setEditId(l.id);
  };

  const remove = (id) => {
    if (confirm("Delete this listing?")) {
      axios.delete(`${import.meta.env.VITE_API_BASE}/listings/${id}`).then(fetchData);
    }
  };

  return (
    <div>
      <h2>{editId ? 'Edit Listing' : 'Add Listing'}</h2>
      <div className="booking-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <select value={form.propertyId} onChange={e => setForm({ ...form, propertyId: e.target.value })}>
          <option value=''>Select Property</option>
          {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input placeholder='Name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Floor' type='number' value={form.floor} onChange={e => setForm({ ...form, floor: e.target.value })} />
        <input placeholder='Type (1BHK)' value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        <input
          placeholder='Check-in Time (e.g. 14:00)'
          value={form.checkInTime || ''}
          onChange={e => setForm({ ...form, checkInTime: e.target.value })}
        />
        <input
          placeholder='Check-out Time (e.g. 11:00)'
          value={form.checkOutTime || ''}
          onChange={e => setForm({ ...form, checkOutTime: e.target.value })}
        />
        <input placeholder='Status' value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
        <input placeholder='WiFi Name' value={form.wifiName} onChange={e => setForm({ ...form, wifiName: e.target.value })} />
        <input placeholder='WiFi Password' value={form.wifiPassword} onChange={e => setForm({ ...form, wifiPassword: e.target.value })} />
        <input placeholder='Max Guests' type='number' value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: e.target.value })} />
        <button className="booking-btn" onClick={submit}>{editId ? 'Update' : 'Add Listing'}</button>
        {editId && <button className="booking-btn booking-btn-cancel" onClick={resetForm}>Cancel</button>}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="booking-table" border='1' cellPadding='8' style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Name</th>
              <th>Floor</th>
              <th>Type</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>WiFi Name</th>
              <th>Guests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(l => (
              <tr key={l.id}>
                <td>{properties.find(p => p.id === l.propertyId)?.name || '—'}</td>
                <td>{l.name}</td>
                <td>{l.floor}</td>
                <td>{l.type}</td>
                <td>{l.checkInTime}</td>
                <td>{l.checkOutTime}</td>
                <td>{l.status}</td>
                <td>{l.wifiName}</td>
                <td>{l.maxGuests}</td>
                <td>
                  <button onClick={() => edit(l)}>Edit</button>
                  <button onClick={() => remove(l.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listings;
