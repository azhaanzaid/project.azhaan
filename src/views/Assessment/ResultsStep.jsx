import React, { useMemo } from 'react';
import { symptomsDB } from '../../data/symptomsDB';
import { historyDB } from '../../data/historyDB';
import { getMedication } from '../../utils/dosage';

const ResultsStep = ({ selections, profile, onReset, onPrint }) => {
    const assessmentResults = useMemo(() => {
        return selections.symptoms.map(id => {
            const symptom = symptomsDB.find(s => s.id === id);
            if (!symptom) return null;
            const med = getMedication(symptom, profile.age, profile.pregnant, selections.history);
            return { ...symptom, med };
        }).filter(Boolean);
    }, [selections, profile]);
    const hasHighRisk = selections.history.length > 0;

    const selectedHist = useMemo(() => {
        return selections.history.map(id => historyDB.find(h => h.id === id)).filter(Boolean);
    }, [selections.history]);

    const date = new Date().toLocaleDateString();
    const prescriptionID = useMemo(() => Math.floor(10000 + Math.random() * 90000), []);

    return (
        <div id="step-3" className="step-content">
            <h2 className="section-title">Health Assessment</h2>

            <div id="result-banner" className={`risk-banner ${hasHighRisk ? 'risk-high' : 'risk-low'}`}>
                {hasHighRisk ? (
                    <div className="risk-banner risk-high" style={{ width: '100%', margin: 0 }}>
                        <i className="fas fa-exclamation-circle"></i> HIGH RISK DETECTED <br />
                        <span style={{ fontWeight: 400, fontSize: '1rem' }}>Professional Consultation Strongly Recommended</span>
                    </div>
                ) : (
                    <div className="risk-banner risk-low" style={{ width: '100%', margin: 0 }}>
                        <i className="fas fa-check-circle"></i> ANALYSIS COMPLETE: LOW RISK <br />
                        <span style={{ fontWeight: 400, fontSize: '1rem' }}>Home care remedies suggested.</span>
                    </div>
                )}
            </div>

            <div className="prescription-sheet" id="results-container" style={{ display: 'block' }}>
                <div className="rx-header">
                    <div className="rx-logo">
                        <i className="fas fa-file-medical-alt"></i> MediCure AI <br />
                        <span style={{ fontSize: '0.8rem', fontWeight: 'normal', marginLeft: '10px' }}>e-Prescription</span>
                    </div>
                    <div className="rx-info">
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Patient:</strong> {profile.name} ({profile.age}yrs / {profile.sex})</p>
                        <p><strong>Mobile:</strong> +91 {profile.mobile}</p>
                        <p><strong>ID:</strong> #{prescriptionID}</p>
                    </div>
                </div>

                {hasHighRisk && (
                    <div className="rx-section" style={{ border: '1px solid red', padding: '10px', borderRadius: '5px' }}>
                        <div className="rx-title" style={{ color: 'red', borderBottomColor: 'red' }}>⚠️ Critical Context</div>
                        <ul style={{ listStyle: 'square', paddingLeft: '20px', color: '#a00' }}>
                            {selectedHist.map(h => <li key={h.id}>Patient has history of <strong>{h.name}</strong> - Consult {h.specialist} immediately.</li>)}
                        </ul>
                    </div>
                )}

                {profile.age >= 60 && (
                    <div className="rx-section" style={{ border: '1px solid orange', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                        <div className="rx-title" style={{ color: 'orange', borderBottomColor: 'orange' }}>⚠️ Age Warning</div>
                        <p style={{ fontSize: '0.9rem' }}>Patient is over 60. Dosage has been adjusted effectively by AI logic.</p>
                    </div>
                )}

                {profile.pregnant && (
                    <div className="rx-section" style={{ border: '1px solid #d63384', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                        <div className="rx-title" style={{ color: '#d63384', borderBottomColor: '#d63384' }}>⚠️ Pregnancy Alert</div>
                        <p style={{ fontSize: '0.9rem' }}>Medications filtered for pregnancy safety. Please consult OBGYN.</p>
                    </div>
                )}

                <div className="rx-section">
                    <div className="rx-title">Rx <span style={{ fontSize: '0.8rem', textTransform: 'none', fontWeight: 'normal' }}>(Medications)</span></div>
                    {assessmentResults.length > 0 ? assessmentResults.map(res => (
                        <div key={res.id} className="rx-item">
                            <span><strong>{res.med}</strong></span>
                            <span style={{ color: '#666', fontSize: '0.9rem' }}> (for {res.name})</span>
                        </div>
                    )) : <p>No specific medication required.</p>}
                </div>

                <div className="rx-section">
                    <div className="rx-title">Dietary Plan</div>
                    <ul style={{ listStyle: 'circle', paddingLeft: '20px' }}>
                        {assessmentResults.length > 0 ? assessmentResults.map(res => (
                            <li key={res.id}>{res.diet} <span style={{ color: '#666' }}>(for {res.name})</span></li>
                        )) : <li>Maintain a balanced diet.</li>}
                    </ul>
                </div>

                <div className="rx-section">
                    <div className="rx-title">General Advice</div>
                    <ul style={{ listStyle: 'circle', paddingLeft: '20px' }}>
                        {assessmentResults.length > 0 ? assessmentResults.map(res => (
                            <li key={res.id}>{res.advice}</li>
                        )) : <li>Rest well.</li>}
                    </ul>
                </div>

                <div className="rx-footer">
                    <div>
                        <p><strong>Disclaimer:</strong> AI generated advice.</p>
                        <p>Not a substitute for professional medical help.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p>_______________________</p>
                        <p>Digital Signature</p>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px' }} className="no-print">
                <button className="btn btn-outline" onClick={onReset}>Back to Home</button>
                <button className="btn btn-primary" onClick={onPrint}>
                    <i className="fas fa-print"></i> Print Report
                </button>
            </div>
        </div>
    );
};

export default ResultsStep;
