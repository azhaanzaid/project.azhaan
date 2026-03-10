import React, { useState } from 'react';
import { doctorsDB } from '../data/doctorsDB';
import BookingModal from '../components/BookingModal';

const Directory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [bookingDoctor, setBookingDoctor] = useState(null);

    const filteredDoctors = doctorsDB.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookingConfirm = (formData) => {
        alert(`Appointment confirmed for ${formData.name} with ${bookingDoctor} on ${formData.date}`);
        setBookingDoctor(null);
    };

    return (
        <section id="view-directory" className="view-section active">
            <h2 className="section-title">Specialist Directory</h2>
            <p className="section-subtitle">Connect with top-rated medical professionals in your area.</p>

            <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="doc-grid">
                {filteredDoctors.map(d => (
                    <div key={d.name} className="doc-card">
                        <img src={d.img} className="doc-img" alt={d.name} />
                        <h3>{d.name}</h3>
                        <p style={{ color: 'var(--primary)', fontWeight: '600' }}>{d.type}</p>
                        <p><i className="fas fa-briefcase"></i> {d.exp} Experience</p>
                        <button
                            className="btn btn-outline"
                            style={{ marginTop: '15px', width: '100%' }}
                            onClick={() => setBookingDoctor(d.name)}
                        >
                            Book Appointment
                        </button>
                    </div>
                ))}
            </div>

            {bookingDoctor && (
                <BookingModal
                    doctorName={bookingDoctor}
                    onClose={() => setBookingDoctor(null)}
                    onConfirm={handleBookingConfirm}
                />
            )}
        </section>
    );
};

export default Directory;
