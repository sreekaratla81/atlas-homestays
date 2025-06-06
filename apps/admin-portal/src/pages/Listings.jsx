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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const [listRes, propRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE}/listings`),
        axios.get(`${import.meta.env.VITE_API_BASE}/properties`)
      ]);
      setListings(listRes.data);
      setProperties(propRes.data);
    } catch (err) {
      setErrorMsg('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
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
    setErrorMsg('');
  };

  const submit = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const payload = {
        ...form,
        propertyId: parseInt(form.propertyId),
        floor: parseInt(form.floor),
        maxGuests: parseInt(form.maxGuests)
      };
      const url = `${import.meta.env.VITE_API_BASE}/listings`;
      if (editId) {
        await axios.put(`${url}/${editId}`, payload);
      } else {
        await axios.post(url, payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      setErrorMsg('Failed to save listing. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const edit = (l) => {
    setForm({ ...l, propertyId: l.propertyId.toString() });
    setEditId(l.id);
    setErrorMsg('');
  };

  const remove = async (id) => {
    if (confirm("Delete this listing?")) {
      setLoading(true);
      setErrorMsg('');
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE}/listings/${id}`);
        fetchData();
      } catch (err) {
        setErrorMsg('Failed to delete listing. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>{editId ? 'Edit Listing' : 'Add Listing'}</h2>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      {loading && <div style={{ color: '#1890ff', marginBottom: 10 }}>Loading...</div>}
      <div className="booking-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <form className="form-grid" onSubmit={e => { e.preventDefault(); submit(); }}>
          <label>
            Property
            <select value={form.propertyId} onChange={e => setForm({ ...form, propertyId: e.target.value })} required>
              <option value=''>Select Property</option>
              {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label>
            Name
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Floor
            <input type='number' value={form.floor} onChange={e => setForm({ ...form, floor: e.target.value })} required min={0} />
          </label>
          <label>
            Type (1BHK)
            <input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required />
          </label>
          <label>
            Check-in Time (e.g. 14:00)
            <input value={form.checkInTime || ''} onChange={e => setForm({ ...form, checkInTime: e.target.value })} required pattern="^([01]\d|2[0-3]):([0-5]\d)$" />
          </label>
          <label>
            Check-out Time (e.g. 11:00)
            <input value={form.checkOutTime || ''} onChange={e => setForm({ ...form, checkOutTime: e.target.value })} required pattern="^([01]\d|2[0-3]):([0-5]\d)$" />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <label>
            WiFi Name
            <input value={form.wifiName} onChange={e => setForm({ ...form, wifiName: e.target.value })} />
          </label>
          <label>
            WiFi Password
            <input value={form.wifiPassword} onChange={e => setForm({ ...form, wifiPassword: e.target.value })} />
          </label>
          <label>
            Max Guests
            <input type='number' value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: e.target.value })} required min={1} />
          </label>
          {/* Move buttons to a new row below the fields for better alignment */}
          <div style={{ display: 'flex', gap: '10px', marginTop: 16, justifyContent: 'flex-end', width: '100%' }}>
            <button className="booking-btn" type="submit" disabled={loading}>
              {editId ? 'Update' : 'Add Listing'}
            </button>
            {editId && (
              <button className="booking-btn booking-btn-cancel" type="button" onClick={resetForm} disabled={loading}>
                Cancel
              </button>
            )}
          </div>
        </form>
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
                  <button className="booking-btn" onClick={() => edit(l)} disabled={loading}>Edit</button>
                  <button className="booking-btn booking-btn-cancel" onClick={() => remove(l.id)} disabled={loading}>Delete</button>
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
