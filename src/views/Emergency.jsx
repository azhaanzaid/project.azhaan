import React from 'react';

const Emergency = ({ onNavigate }) => {
    return (
        <section id="view-emergency" className="view-section active">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <i className="fas fa-ambulance" style={{ fontSize: '5rem', color: 'var(--danger)', background: '#ffe5e5', padding: '30px', borderRadius: '50%', marginBottom: '20px' }}></i>
                <h2 className="section-title" style={{ color: 'var(--danger)' }}>Emergency Assistance</h2>
                <p className="section-subtitle">For critical situations requiring immediate attention.</p>

                <div className="card" style={{ background: '#fff5f5', border: '2px solid var(--danger)', marginBottom: '30px', textAlign: 'left' }}>
                    <h3 style={{ color: 'var(--danger)', marginBottom: '15px' }}><i className="fas fa-phone-alt"></i> Emergency Contacts</h3>
                    <ul style={{ fontSize: '1.1rem', lineHeight: 2 }}>
                        <li><strong>Ambulance:</strong> <a href="tel:102" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>102</a></li>
                        <li><strong>Police:</strong> <a href="tel:100" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>100</a></li>
                        <li><strong>General Helpline:</strong> <a href="tel:112" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>112</a></li>
                    </ul>
                </div>

                <div className="card" style={{ textAlign: 'left' }}>
                    <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}><i className="fas fa-first-aid"></i> Quick First Aid</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Bleeding:</strong> Apply firm pressure with clean cloth. Elevate injury.
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Burns:</strong> Run under cool water for 20 mins. Do NOT apply ice/butter.
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Choking:</strong> Perform Heimlich maneuver if unable to breathe.
                    </div>
                </div>

                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button className="btn btn-danger" onClick={() => window.location.href = 'tel:102'} style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}>
                        <i className="fas fa-phone"></i> CALL AMBULANCE NOW
                    </button>
                    <button className="btn btn-primary" onClick={() => onNavigate('nearby')} style={{ width: '100%', fontSize: '1rem', padding: '14px' }}>
                        <i className="fas fa-map-marker-alt"></i> Find Nearest Hospital on Map
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Emergency;
