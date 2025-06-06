import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Properties = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: '', address: '', type: '', ownerName: '', contactPhone: '', commissionPercent: '', status: 'active'
  });
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    axios.get(`${import.meta.env.VITE_API_BASE}/properties`).then(res => setList(res.data));
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
    console.log("Submitting property:", form);
    if (editId) {
      axios.put(`${import.meta.env.VITE_API_BASE}/properties/${editId}`, form).then(() => {
        resetForm();
        fetchData();
      });
    } else {
      axios.post(`${import.meta.env.VITE_API_BASE}/properties`, form).then(() => {
        resetForm();
        fetchData();
      });
    }
  };

  const edit = (prop) => {
    setForm({ ...prop });
    setEditId(prop.id);
  };

  const remove = (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      axios.delete(`${import.meta.env.VITE_API_BASE}/properties/${id}`).then(fetchData);
    }
  };

  return (
    <div>
      <h2>{editId ? 'Edit Property' : 'Add Property'}</h2>
      <div className="booking-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input placeholder='Name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Address' value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input placeholder='Type' value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder='Owner Name' value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })} />
        <input placeholder='Contact Phone' value={form.contactPhone} onChange={e => setForm({ ...form, contactPhone: e.target.value })} />
        <input placeholder='Commission %' type='number' value={form.commissionPercent} onChange={e => setForm({ ...form, commissionPercent: e.target.value })} />
        <input placeholder='Status' value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
        <button className="booking-btn" onClick={submit}>{editId ? 'Update Property' : 'Add Property'}</button>
        {editId && <button className="booking-btn booking-btn-cancel" onClick={resetForm}>Cancel</button>}
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
                  <button onClick={() => edit(p)}>Edit</button>
                  <button onClick={() => remove(p.id)}>Delete</button>
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
