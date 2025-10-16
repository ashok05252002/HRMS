import React from 'react';

const DocumentsTab = ({ employee }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Documents for {employee.name}</h3>
            <p>Uploaded documents and compliance forms will be displayed here.</p>
        </div>
    );
};

export default DocumentsTab;
