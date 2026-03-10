import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
    const [creds, setCreds] = useState({ user: '', pass: '' });
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (creds.user === 'AZHAAN' && creds.pass === '7878') {
            onLogin();
        } else {
            setError(true);
        }
    };

    return (
        <section id="view-admin-login" className="view-section active">
            <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
                <h2 className="section-title">Admin Login</h2>
                <p className="section-subtitle">Authorized Personnel Only</p>
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Username"
                            style={{ marginBottom: '15px', borderRadius: '8px' }}
                            value={creds.user}
                            onChange={(e) => setCreds({ ...creds, user: e.target.value })}
                        />
                        <input
                            type="password"
                            className="search-input"
                            placeholder="Password"
                            style={{ marginBottom: '20px', borderRadius: '8px' }}
                            value={creds.pass}
                            onChange={(e) => setCreds({ ...creds, pass: e.target.value })}
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                    </form>
                    {error && <p id="login-error" style={{ color: 'red', marginTop: '10px' }}>Invalid Credentials</p>}
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;
