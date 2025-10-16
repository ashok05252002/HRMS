import React from 'react';

const PayrollTab = ({ employee }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Payroll Information for {employee.name}</h3>
            <p>Salary slips and compensation details will be displayed here.</p>
        </div>
    );
};

export default PayrollTab;
