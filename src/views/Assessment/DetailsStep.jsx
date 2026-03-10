import React from 'react';

const DetailsStep = ({ profile, setProfile, onNext }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profile.name || !profile.age || !profile.mobile) {
            alert("Please fill in Name, Age, and Mobile Number.");
            return;
        }
        if (profile.mobile.length !== 10) {
            alert("Please enter a valid 10-digit Mobile Number.");
            return;
        }
        onNext();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id.replace('p_', '')]: value }));
    };

    const handleSexChange = (e) => {
        const sex = e.target.value;
        setProfile(prev => ({
            ...prev,
            sex: sex,
            pregnant: sex === 'female' ? prev.pregnant : false
        }));
    };

    return (
        <div id="step-0" className="step-content">
            <h2 className="section-title">Patient Details</h2>
            <p className="section-subtitle">Help us provide safe, personalized recommendations.</p>

            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <form id="patient-form" onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Patient Name</label>
                        <input
                            type="text"
                            id="p_name"
                            required
                            className="search-input"
                            style={{ borderRadius: '12px', padding: '12px' }}
                            placeholder="Full Name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Age</label>
                        <input
                            type="number"
                            id="p_age"
                            required
                            min="0"
                            max="120"
                            className="search-input"
                            style={{ borderRadius: '12px', padding: '12px' }}
                            placeholder="Years (e.g. 25)"
                            value={profile.age || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Mobile Number</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: 'bold', background: '#eee', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}>+91</span>
                            <input
                                type="tel"
                                id="p_mobile"
                                required
                                pattern="[0-9]{10}"
                                className="search-input"
                                style={{ borderRadius: '12px', padding: '12px' }}
                                placeholder="10-digit Number"
                                maxLength="10"
                                value={profile.mobile}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Biological Sex</label>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="radio"
                                    name="p_sex"
                                    value="male"
                                    checked={profile.sex === 'male'}
                                    onChange={handleSexChange}
                                /> Male
                            </label>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="radio"
                                    name="p_sex"
                                    value="female"
                                    checked={profile.sex === 'female'}
                                    onChange={handleSexChange}
                                /> Female
                            </label>
                        </div>
                    </div>

                    {profile.sex === 'female' && (
                        <div id="pregnancy-wrapper" style={{ marginBottom: '20px', background: '#fff0f3', padding: '15px', borderRadius: '8px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#d63384' }}>Are you currently pregnant?</label>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="radio"
                                        name="p_preg"
                                        value="no"
                                        checked={!profile.pregnant}
                                        onChange={() => setProfile(prev => ({ ...prev, pregnant: false }))}
                                    /> No
                                </label>
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="radio"
                                        name="p_preg"
                                        value="yes"
                                        checked={profile.pregnant}
                                        onChange={() => setProfile(prev => ({ ...prev, pregnant: true }))}
                                    /> Yes
                                </label>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#d63384', marginTop: '5px' }}>*Crucial for medication safety.</p>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Continue <i className="fas fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DetailsStep;
