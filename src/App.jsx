import React, { useState, useMemo } from 'react';
import './styles.css';
import PatientPanel from './components/PatientPanel';
import DoseControl from './components/DoseControl';
import VitalMonitor from './components/VitalMonitor';
import ActionPanel from './components/ActionPanel';
import ActivityLog from './components/ActivityLog';

const DRUGS = [
  { id: 1, name: 'Paracetamol', highRisk: false },
  { id: 2, name: 'Amoxicillin', highRisk: false },
  { id: 3, name: 'Insulin Glargine', highRisk: true },
];

export default function App() {
  const [patient, setPatient] = useState({ name: 'Sania Ghosh', age: 21, weight: 50 });
  const [dose, setDose] = useState(0);
  const [selectedDrug, setSelectedDrug] = useState(DRUGS[0]);
  const [heartRate, setHeartRate] = useState(72);
  const [logs, setLogs] = useState([]);

  // --- Core Safety Logic (Unchanged) ---
  const safeLimit = useMemo(() => patient.weight * 2, [patient.weight]);
  const riskPercent = useMemo(() => (dose / safeLimit) * 100, [dose, safeLimit]);

  const riskLevel = useMemo(() => {
    if (riskPercent <= 70) return 'safe';
    if (riskPercent <= 100) return 'warning';
    return 'danger';
  }, [riskPercent]);

  const isLocked = heartRate < 50;
  const requiresVerification = selectedDrug.highRisk;
  const canAdminister = dose > 0 && riskLevel !== 'danger' && !isLocked;

  // --- Unchanged Handlers ---
  const addLog = (message, type) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [{ id: Date.now(), timestamp, message, type }, ...prev]);
  };

  const handleAdminister = (isVerified) => {
    if (requiresVerification && !isVerified) {
      addLog(`Verification failed: ${selectedDrug.name}`, 'blocked');
      return;
    }
    addLog(`Administered ${dose}mg ${selectedDrug.name}`, 'success');
  };

  const handleOverride = () => { addLog(`EMERGENCY OVERRIDE ACTIVATED`, 'override'); };

  return (
    <div className="dashboard-container">
      {/* Sidebar - Visual only, styled like reference */}
      <nav className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="vitalcheck-logo">Vc</div>
          <span>VITALCHECK</span>
        </div>
        <ul className="sidebar-menu">
          <li className="active"><span className="menu-icon">🎛️</span>Dashboard</li>
          <li><span className="menu-icon">👤</span>Patients</li>
          <li><span className="menu-icon">💊</span>Formulary</li>
          <li><span className="menu-icon">📈</span>Analytics</li>
          <li><span className="menu-icon">⚙️</span>Settings</li>
        </ul>
        <div className="sidebar-user">
          <img src="https://i.pravatar.cc/150?u=nurse1" alt="Nurse avatar" />
          <div className="user-info">
            <span>Sania J.</span>
            <span className="role">Clinical Lead</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`main-dashboard ${isLocked ? 'system-locked-blur' : ''}`}>
        <header className="main-header">
          <div className="header-title">
            <h2>Dose Guard / <span className="view-mode">Summary View</span></h2>
          </div>
          <div className="header-status">
            <div className={`status-orb ${isLocked ? 'status-critical' : 'status-ok'}`}></div>
            <span>{isLocked ? 'PATIENT INSTABILITY' : 'SYSTEM OPERATIONAL'}</span>
          </div>
        </header>

        {/* The Grid Layout (Refactoring the flow for cleaner look) */}
        <div className="dashboard-grid">
          
          <div className="grid-cell panel-left">
            <PatientPanel patient={patient} setPatient={setPatient} safeLimit={safeLimit} />
            <VitalMonitor heartRate={heartRate} setHeartRate={setHeartRate} />
          </div>

          <div className="grid-cell panel-center">
            <DoseControl 
              drugs={DRUGS} 
              selectedDrug={selectedDrug} 
              setSelectedDrug={setSelectedDrug}
              dose={dose}
              setDose={setDose}
              riskPercent={riskPercent}
              riskLevel={riskLevel}
            />
            <ActionPanel 
              canAdminister={canAdminister} 
              requiresVerification={requiresVerification}
              onAdminister={handleAdminister}
              onOverride={handleOverride}
            />
          </div>

          <div className="grid-cell panel-right">
            <ActivityLog logs={logs} />
          </div>

        </div>
      </main>

      {/* Logic for Lock Overlay stays, style updated */}
      {isLocked && (
        <div className="lock-overlay">
          <div className="lock-frame">
            <div className="lock-icon">🔒</div>
            <h3>SYSTEM INTERLOCK ACTIVATED</h3>
            <p>Heart Rate: {heartRate} BPM (Below 50 threshold)</p>
            <p className="sub">All clinical delivery actions are disabled.</p>
          </div>
        </div>
      )}
    </div>
  );
}
