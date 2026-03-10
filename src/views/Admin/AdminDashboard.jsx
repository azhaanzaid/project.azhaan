import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ onLogout }) => {
    const [patients, setPatients] = useState([]);
    const [bookings, setBookings] = useState(0);

    useEffect(() => {
        const storedPatients = JSON.parse(localStorage.getItem('admin_patients')) || [];
        setPatients(storedPatients);

        // Abstract booking count logic or fetch from localStorage
        setBookings(3); // Mock for now
    }, []);

    return (
        <section id="view-admin-dashboard" className="view-section active">
            <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Admin Dashboard</h2>
                <button className="btn btn-danger" onClick={onLogout} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Logout</button>
            </div>

            <div className="service-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '40px' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>{patients.length}</h3>
                    <p style={{ color: 'var(--gray)' }}>Total Checkups</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--success)', fontSize: '2.5rem' }}>{bookings}</h3>
                    <p style={{ color: 'var(--gray)' }}>Doctor Bookings</p>
                </div>
            </div>

            <h3 style={{ marginBottom: '20px' }}>Recent Patient Comparisons</h3>
            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Patient</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Symptoms</th>
                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((p, i) => (
                            <tr key={i}>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{p.date}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{p.name} ({p.age}y, {p.sex})</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{p.symptoms}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: p.risk === 'HIGH' ? '#ffebee' : '#e8f5e9', color: p.risk === 'HIGH' ? '#c62828' : '#2e7d32', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                        {p.risk}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {patients.length === 0 && (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No patient data found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminDashboard;
