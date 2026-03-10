import React, { useState } from 'react';

const BookingModal = ({ doctorName, onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    const handleChange = (e) => {
        const { type, value } = e.target;
        const key = type === 'tel' ? 'phone' : (type === 'date' ? 'date' : 'name');
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <i className="fas fa-calendar-check" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '15px' }}></i>
                <h3>Book Appointment</h3>
                <p style={{ color: 'var(--gray)', marginBottom: '20px' }}>with <span style={{ fontWeight: 'bold', color: 'var(--dark)' }}>{doctorName}</span></p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        style={{ borderRadius: '8px', padding: '10px', marginBottom: '10px' }}
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="tel"
                        className="search-input"
                        style={{ borderRadius: '8px', padding: '10px', marginBottom: '10px' }}
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <input
                        type="date"
                        className="search-input"
                        style={{ borderRadius: '8px', padding: '10px', marginBottom: '20px' }}
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
