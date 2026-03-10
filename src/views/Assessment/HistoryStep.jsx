import React from 'react';
import { historyDB } from '../../data/historyDB';

const HistoryStep = ({ selectedHistory, onToggleHistory, onFinalize }) => {
    return (
        <div id="step-2" className="step-content">
            <h2 className="section-title" style={{ color: 'var(--danger)' }}>Critical History Check</h2>
            <p className="section-subtitle">Do you have any existing chronic conditions? This is vital for safety.</p>

            <div className="options-grid" id="history-grid">
                {historyDB.map(h => (
                    <div
                        key={h.id}
                        className={`option-card ${selectedHistory.includes(h.id) ? 'selected' : ''}`}
                        onClick={() => onToggleHistory(h.id)}
                        style={{ borderLeft: `4px solid ${h.risk === 'HIGH' ? 'var(--danger)' : 'var(--warning)'}` }}
                    >
                        <i className={`fas ${h.icon} option-icon`}></i>
                        <h4>{h.name}</h4>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button className="btn btn-primary" onClick={() => onFinalize()}>
                    Analyze & Get Results <i className="fas fa-check-circle"></i>
                </button>
                <p
                    style={{ marginTop: '10px', fontSize: '0.9rem', color: '#777', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => onFinalize(true)}
                >
                    Skip (I have no conditions)
                </p>
            </div>
        </div>
    );
};

export default HistoryStep;
