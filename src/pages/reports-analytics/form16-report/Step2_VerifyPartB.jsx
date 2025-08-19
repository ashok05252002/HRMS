import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const generatePan = () => `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`;

const dummyData = Array.from({ length: 5 }, () => ({
    pan: generatePan(),
    name: faker.person.fullName(),
    allowances: formatCurrency(faker.finance.amount({ min: 50000, max: 150000, dec: 0 })),
    deductions: formatCurrency(faker.finance.amount({ min: 20000, max: 80000, dec: 0 })),
    taxableIncome: formatCurrency(faker.finance.amount({ min: 400000, max: 1200000, dec: 0 })),
}));

const Step2_VerifyPartB = ({ onVerified }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onVerified(e.target.checked);
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 2: Verify Part B Data (from System)</h3>
            <p className="text-sm text-base-content/70">Please review the salary details sourced from the payroll system.</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>PAN</th>
                            <th>Employee Name</th>
                            <th>Allowances (u/s 10)</th>
                            <th>Deductions (Chap VI-A)</th>
                            <th>Taxable Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData.map(row => (
                            <tr key={row.pan}>
                                <td className="font-mono">{row.pan}</td>
                                <td>{row.name}</td>
                                <td>{row.allowances}</td>
                                <td>{row.deductions}</td>
                                <td>{row.taxableIncome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="form-control mt-4 p-4 bg-base-200 rounded-lg">
                <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" className="checkbox checkbox-primary" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="label-text font-medium">I have verified all details in Part B and confirm they are correct.</span>
                </label>
            </div>
        </div>
    );
};

export default Step2_VerifyPartB;
