import React from 'react';

const Navbar = ({ currentView, onNavigate }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <i className="fas fa-heartbeat fa-lg"></i>
                <span>MediCure </span>
            </div>
            <ul className="nav-links">
                <li
                    className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
                    onClick={() => onNavigate('home')}
                >
                    Home
                </li>
                <li
                    className={`nav-item ${currentView === 'assessment' ? 'active' : ''}`}
                    onClick={() => onNavigate('assessment')}
                >
                    Checkup
                </li>
                <li
                    className={`nav-item ${currentView === 'directory' ? 'active' : ''}`}
                    onClick={() => onNavigate('directory')}
                >
                    Doctors
                </li>
                <li
                    className={`nav-item ${currentView === 'nearby' ? 'active' : ''}`}
                    onClick={() => onNavigate('nearby')}
                    style={{ color: '#28a745' }}
                >
                    <i className="fas fa-map-marker-alt"></i> Nearby
                </li>
                <li
                    className={`nav-item ${currentView === 'emergency' ? 'active' : ''}`}
                    onClick={() => onNavigate('emergency')}
                    style={{ color: 'var(--danger)' }}
                >
                    Emergency
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
