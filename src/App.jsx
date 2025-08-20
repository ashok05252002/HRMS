import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import PerformanceAppraisals from './pages/PerformanceAppraisals';
import TrainingManagement from './pages/TrainingManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Settings from './pages/Settings';
import Attendance from './pages/Attendance';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees/*" element={<Employees />} />
          <Route path="/performance-appraisals/*" element={<PerformanceAppraisals />} />
          <Route path="/attendance/*" element={<Attendance />} />
          <Route path="/training-management/*" element={<TrainingManagement />} />
          <Route path="/reports-analytics/*" element={<ReportsAnalytics />} />
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
