import React from 'react';

const LeavesTab = ({ employee }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Leave History for {employee.name}</h3>
            <p>Leave records and balances will be displayed here.</p>
        </div>
    );
};

export default LeavesTab;
