import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Assessment from './views/Assessment/Assessment';
import Directory from './views/Directory';
import NearbyMap from './views/NearbyMap';
import Emergency from './views/Emergency';
import AdminLogin from './views/Admin/AdminLogin';
import AdminDashboard from './views/Admin/AdminDashboard';
import { symptomsDB } from './data/symptomsDB';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [viewHistory, setViewHistory] = useState(['home']);
  const [isAdmin, setIsAdmin] = useState(false);

  const [patientProfile, setPatientProfile] = useState({
    name: "",
    age: 0,
    sex: "male",
    mobile: "",
    pregnant: false
  });

  const [selections, setSelections] = useState({
    symptoms: [],
    history: []
  });

  const navigate = (viewId) => {
    setCurrentView(viewId);
    setViewHistory(prev => [...prev, viewId]);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop();
      const lastView = newHistory[newHistory.length - 1];
      setCurrentView(lastView);
      setViewHistory(newHistory);
    } else {
      setCurrentView('home');
    }
  };

  const handleAssessmentComplete = (profile, sels) => {
    // Save to localStorage for Admin
    const assessmentData = {
      date: new Date().toLocaleString(),
      name: profile.name,
      age: profile.age,
      sex: profile.sex,
      symptoms: sels.symptoms.map(id => symptomsDB.find(s => s.id === id)?.name).join(', '),
      risk: sels.history.length > 0 ? 'HIGH' : 'LOW'
    };

    const existing = JSON.parse(localStorage.getItem('admin_patients')) || [];
    localStorage.setItem('admin_patients', JSON.stringify([assessmentData, ...existing]));
  };

  return (
    <div className="App">
      <Navbar currentView={currentView} onNavigate={navigate} />

      <main className="container">
        {currentView !== 'home' && (
          <div className="nav-controls">
            <div className="back-btn" onClick={goBack}>
              <i className="fas fa-arrow-left"></i> Back
            </div>
          </div>
        )}

        {currentView === 'home' && <Home onNavigate={navigate} />}

        {currentView === 'assessment' && (
          <Assessment
            onNavigate={navigate}
            patientProfile={patientProfile}
            setPatientProfile={setPatientProfile}
            selections={selections}
            setSelections={setSelections}
            onComplete={handleAssessmentComplete}
          />
        )}

        {currentView === 'directory' && <Directory />}

        {currentView === 'nearby' && <NearbyMap />}

        {currentView === 'emergency' && <Emergency onNavigate={navigate} />}

        {currentView === 'admin-login' && (
          isAdmin ? navigate('admin-dashboard') : <AdminLogin onLogin={() => { setIsAdmin(true); navigate('admin-dashboard'); }} />
        )}

        {currentView === 'admin-dashboard' && (
          isAdmin ? <AdminDashboard onLogout={() => { setIsAdmin(false); navigate('home'); }} /> : navigate('admin-login')
        )}

      </main>

      <footer style={{ textAlign: 'center', padding: '40px 20px', marginTop: '50px', color: 'var(--gray)', fontSize: '0.9rem', borderTop: '1px solid #eee' }}>
        <p>&copy; 2026 MediCure. Empowering Healthcare with Technology.</p>
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('nearby'); }}>Hospitals</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('emergency'); }}>Emergency</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('admin-login'); }}>Admin</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
