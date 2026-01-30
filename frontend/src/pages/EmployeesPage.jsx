import React from 'react';
import EmployeeList from '../components/EmployeeList';

/**
 * Employees Page - Employee Directory and Management
 */
const EmployeesPage = ({ onDataChange }) => {
    return (
        <div>
            <EmployeeList onDataChange={onDataChange} />
        </div>
    );
};

export default EmployeesPage;
