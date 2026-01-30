import React, { useState } from 'react';
import './index.css';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [refreshKey, setRefreshKey] = useState(0);

    const handleDataChange = () => {
        // Trigger refresh of statistics when employee data changes
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div>
            <header className="header">
                <div className="header-content">
                    <div>
                        <h1>Employee Directory</h1>
                        <p className="header-subtitle">Manage your organization's employee data efficiently</p>
                    </div>
                </div>
            </header>

            <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

            <div className="container">
                {currentPage === 'dashboard' && (
                    <DashboardPage key={refreshKey} />
                )}

                {currentPage === 'employees' && (
                    <EmployeesPage onDataChange={handleDataChange} />
                )}
            </div>
        </div>
    );
}

export default App;

