import React from 'react';

const Home = ({ onNavigate }) => {
    return (
        <section id="view-home" className="view-section active">
            <div className="hero-section">
                <h1 className="hero-title">
                    Your Personal<br /><span style={{ color: 'var(--primary)' }}>Health Assistant</span>
                </h1>
                <p className="hero-text">Instant symptom analysis, home remedies, and specialist connections.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => onNavigate('assessment')}>
                        <i className="fas fa-stethoscope"></i> Start Health Checkup
                    </button>
                    <button className="btn btn-outline" onClick={() => onNavigate('directory')}>
                        <i className="fas fa-user-md"></i> Find a Doctor
                    </button>
                </div>
            </div>

            <div className="section-title" style={{ fontSize: '1.8rem' }}>Our Services</div>
            <div className="service-grid">
                <div className="service-card" onClick={() => onNavigate('assessment')}>
                    <div className="service-icon"><i className="fas fa-notes-medical"></i></div>
                    <h3>Symptom Checker</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                        Analyze symptoms instantly with  precision to get remedies.
                    </p>
                </div>
                <div className="service-card" onClick={() => onNavigate('directory')}>
                    <div className="service-icon"><i className="fas fa-hospital-user"></i></div>
                    <h3>Specialist Directory</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                        Browse and book top-rated doctors in your city.
                    </p>
                </div>
                <div className="service-card" onClick={() => onNavigate('emergency')}>
                    <div className="service-icon" style={{ color: 'var(--danger)', background: 'rgba(255, 107, 107, 0.1)' }}>
                        <i className="fas fa-ambulance"></i>
                    </div>
                    <h3>Emergency Aid</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                        Quick access to ambulance and first-aid guidelines.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Home;
