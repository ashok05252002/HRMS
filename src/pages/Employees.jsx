import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './employees/EmployeeList';
import EmployeeDetail from './employees/EmployeeDetail';

const Employees = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/:employeeId" element={<EmployeeDetail />} />
    </Routes>
  );
};

export default Employees;
