import React, { useState } from 'react';
import DetailsStep from './DetailsStep';
import SymptomsStep from './SymptomsStep';
import HistoryStep from './HistoryStep';
import ResultsStep from './ResultsStep';
import CriticalAlertModal from '../../components/CriticalAlertModal';

const Assessment = ({ onNavigate, patientProfile, setPatientProfile, selections, setSelections, onComplete }) => {
    const [step, setStep] = useState(0);
    const [criticalSymptom, setCriticalSymptom] = useState(null);

    const handleNext = () => setStep(prev => prev + 1);
    const handleReset = () => {
        setStep(0);
        setSelections({ symptoms: [], history: [] });
        onNavigate('home');
    };

    const toggleSelection = (type, id) => {
        setSelections(prev => {
            const current = prev[type];
            const index = current.indexOf(id);
            if (index === -1) {
                return { ...prev, [type]: [...current, id] };
            } else {
                return { ...prev, [type]: current.filter(item => item !== id) };
            }
        });
    };

    const handleFinalize = (isSkip = false) => {
        let finalSels = { ...selections };
        if (isSkip) {
            finalSels.history = [];
            setSelections(prev => ({ ...prev, history: [] }));
        }
        setStep(3);
        if (onComplete) onComplete(patientProfile, finalSels);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <section id="view-assessment" className="view-section active">
            {/* PROGRESS BAR */}
            <div className="steps-container">
                <div className="steps-progress-bar"></div>
                <div className={`step-circle ${step >= 1 ? 'active' : ''}`} id="step-node-1">1</div>
                <div className={`step-circle ${step >= 2 ? 'active' : ''}`} id="step-node-2">2</div>
                <div className={`step-circle ${step >= 3 ? 'active' : ''}`} id="step-node-3">3</div>
            </div>

            {step === 0 && (
                <DetailsStep
                    profile={patientProfile}
                    setProfile={setPatientProfile}
                    onNext={handleNext}
                />
            )}

            {step === 1 && (
                <SymptomsStep
                    selectedSymptoms={selections.symptoms}
                    onToggleSymptom={(id) => toggleSelection('symptoms', id)}
                    onNext={handleNext}
                    onShowCritical={setCriticalSymptom}
                />
            )}

            {step === 2 && (
                <HistoryStep
                    selectedHistory={selections.history}
                    onToggleHistory={(id) => toggleSelection('history', id)}
                    onFinalize={handleFinalize}
                />
            )}

            {step === 3 && (
                <ResultsStep
                    selections={selections}
                    profile={patientProfile}
                    onReset={handleReset}
                    onPrint={handlePrint}
                />
            )}

            {criticalSymptom && (
                <CriticalAlertModal
                    symptom={criticalSymptom}
                    age={patientProfile.age}
                    onClose={() => setCriticalSymptom(null)}
                />
            )}
        </section>
    );
};

export default Assessment;
