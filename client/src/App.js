import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import TrainManagement from './components/TrainManagement';
import SensorManagement from './components/SensorManagement';
import AccidentManagement from './components/AccidentManagement';
import AlertManagement from './components/AlertManagement';
import ResponseTeamManagement from './components/ResponseTeamManagement';
import ResponseActionManagement from './components/ResponseActionManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trains':
        return <TrainManagement />;
      case 'sensors':
        return <SensorManagement />;
      case 'accidents':
        return <AccidentManagement />;
      case 'alerts':
        return <AlertManagement />;
      case 'teams':
        return <ResponseTeamManagement />;
      case 'actions':
        return <ResponseActionManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            <i className="fas fa-train"></i> TrainMoni
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav me-auto">
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'dashboard' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('dashboard')}>
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </button>
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'trains' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('trains')}>
                <i className="fas fa-subway"></i> Trains
              </button>
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'sensors' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('sensors')}>
                <i className="fas fa-microchip"></i> Sensors
              </button>
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'accidents' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('accidents')}>
                <i className="fas fa-exclamation-triangle"></i> Accidents
              </button>
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'alerts' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('alerts')}>
                <i className="fas fa-bell"></i> Alerts
              </button>
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'teams' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('teams')}>
                <i className="fas fa-users"></i> Teams
              </button>
              <button className={`nav-item nav-link btn btn-link ${activeTab === 'actions' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('actions')}>
                <i className="fas fa-tasks"></i> Actions
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid p-4">
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default App;