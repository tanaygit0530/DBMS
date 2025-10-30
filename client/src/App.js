import React, { useState } from 'react';
import './App.css';
import TrainManagement from './components/TrainManagement';
import SensorManagement from './components/SensorManagement';
import AccidentManagement from './components/AccidentManagement';
import AlertManagement from './components/AlertManagement';
import ResponseTeamManagement from './components/ResponseTeamManagement';
import ResponseActionManagement from './components/ResponseActionManagement';

function App() {
  const [activeTab, setActiveTab] = useState('trains');

  const renderActiveTab = () => {
    switch (activeTab) {
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
        return <TrainManagement />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">TrainMoni</a>
          <div className="navbar-nav mr-auto">
            <button className={`nav-item nav-link btn btn-link ${activeTab === 'trains' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('trains')}>
              Trains
            </button>
            <button className={`nav-item nav-link btn btn-link ${activeTab === 'sensors' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('sensors')}>
              Sensors
            </button>
            <button className={`nav-item nav-link btn btn-link ${activeTab === 'accidents' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('accidents')}>
              Accidents
            </button>
            <button className={`nav-item nav-link btn btn-link ${activeTab === 'alerts' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('alerts')}>
              Alerts
            </button>
            <button className={`nav-item nav-link btn btn-link ${activeTab === 'teams' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('teams')}>
              Teams
            </button>
            <button className={`nav-item nav-link btn btn-link ${activeTab === 'actions' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('actions')}>
              Actions
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-4">
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default App;
