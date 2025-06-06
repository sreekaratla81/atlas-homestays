import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Properties = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: '', address: '', type: '', ownerName: '', contactPhone: '', commissionPercent: '', status: 'active'
  });
  const [editId, setEditId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE}/properties`)
      .then(res => setList(res.data))
      .catch(() => setErrorMsg('Failed to fetch properties.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      name: '', address: '', type: '', ownerName: '', contactPhone: '', commissionPercent: '', status: 'active'
    });
    setEditId(null);
  };

  const submit = () => {
    setErrorMsg('');
    setLoading(true);
    const req = editId
      ? axios.put(`${import.meta.env.VITE_API_BASE}/properties/${editId}`, form)
      : axios.post(`${import.meta.env.VITE_API_BASE}/properties`, form);
    req.then(() => {
      resetForm();
      fetchData();
    }).catch(() => setErrorMsg('Failed to save property.'))
      .finally(() => setLoading(false));
  };

  const edit = (prop) => {
    setForm({ ...prop });
    setEditId(prop.id);
  };

  const remove = (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setLoading(true);
      axios.delete(`${import.meta.env.VITE_API_BASE}/properties/${id}`)
        .then(fetchData)
        .catch(() => setErrorMsg('Failed to delete property.'))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <h2>{editId ? 'Edit Property' : 'Add Property'}</h2>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      <div className="booking-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <div className="form-grid">
          <input placeholder='Name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder='Address' value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <input placeholder='Type' value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
          <input placeholder='Owner Name' value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })} />
          <input placeholder='Contact Phone' value={form.contactPhone} onChange={e => setForm({ ...form, contactPhone: e.target.value })} />
          <input placeholder='Commission %' type='number' value={form.commissionPercent} onChange={e => setForm({ ...form, commissionPercent: e.target.value })} />
          <input placeholder='Status' value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
        </div>
        <button className="booking-btn" onClick={submit} disabled={loading}>{editId ? 'Update Property' : 'Add Property'}</button>
        {editId && <button className="booking-btn booking-btn-cancel" onClick={resetForm} disabled={loading}>Cancel</button>}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="booking-table" border='1' cellPadding='8' style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Phone</th>
              <th>Commission %</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.ownerName}</td>
                <td>{p.contactPhone}</td>
                <td>{p.commissionPercent}</td>
                <td>{p.status}</td>
                <td>
                  <button className="booking-btn" onClick={() => edit(p)} disabled={loading}>Edit</button>
                  <button className="booking-btn booking-btn-cancel" onClick={() => remove(p.id)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;
