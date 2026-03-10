import React from 'react';

const CriticalAlertModal = ({ symptom, age, onClose }) => {
    if (!symptom) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box modal-critical">
                <i className="fas fa-exclamation-triangle modal-icon" style={{ fontSize: '3rem', marginBottom: '15px' }}></i>
                <h3 style={{ color: 'var(--danger)', marginBottom: '10px' }}>CRITICAL ALERT!</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    Possible Condition: <span style={{ color: 'var(--dark)' }}>{symptom.disease}</span>
                </p>

                <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ffcccc', marginBottom: '20px', textAlign: 'left' }}>
                    <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '5px' }}>
                        <strong>Recommended Action (Age: {age}):</strong>
                    </p>
                    <p style={{ color: 'var(--danger)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {symptom.meds === 'SEIZURE_PROTOCOL' ? "Follow Seizure Protocol - Call Emergency" : symptom.meds}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '5px' }}>*Immediate medical attention recommended.</p>
                </div>

                <button className="btn btn-danger" onClick={onClose} style={{ width: '100%' }}>
                    I Understand
                </button>
            </div>
        </div>
    );
};

export default CriticalAlertModal;
