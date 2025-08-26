import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './employees/EmployeeList';
import EmployeeDetail from './employees/EmployeeDetail';
import EmployeePolicy from './employees/EmployeePolicy';

const Employees = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/policy" element={<EmployeePolicy />} />
      <Route path="/:employeeId" element={<EmployeeDetail />} />
    </Routes>
  );
};

export default Employees;
