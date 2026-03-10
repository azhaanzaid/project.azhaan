import React, { useState } from 'react';
import { symptomsDB } from '../../data/symptomsDB';

const SymptomsStep = ({ selectedSymptoms, onToggleSymptom, onNext, onShowCritical }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSymptoms = symptomsDB.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNext = () => {
        if (selectedSymptoms.length === 0) {
            alert("Please select at least one symptom.");
            return;
        }
        onNext();
    };

    const handleToggle = (symptom) => {
        onToggleSymptom(symptom.id);
        if (!selectedSymptoms.includes(symptom.id) && symptom.critical) {
            onShowCritical(symptom);
        }
    };

    return (
        <div id="step-1" className="step-content">
            <h2 className="section-title">What's bothering you?</h2>
            <p className="section-subtitle">Select all the symptoms you are currently experiencing.</p>

            <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search symptoms (e.g. Fever, Headache)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="options-grid" id="symptoms-grid">
                {filteredSymptoms.map(s => (
                    <div
                        key={s.id}
                        className={`option-card ${selectedSymptoms.includes(s.id) ? 'selected' : ''}`}
                        onClick={() => handleToggle(s)}
                    >
                        <i className={`fas ${s.icon} option-icon`}></i>
                        <h4>{s.name}</h4>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button className="btn btn-primary" onClick={handleNext}>
                    Next Step <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default SymptomsStep;
