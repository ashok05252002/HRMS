import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const generatePan = () => `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`;

const dummyData = Array.from({ length: 5 }, () => ({
    pan: generatePan(),
    name: faker.person.fullName(),
    grossSalary: formatCurrency(faker.finance.amount({ min: 500000, max: 1500000, dec: 0 })),
    allowances: formatCurrency(faker.finance.amount({ min: 50000, max: 150000, dec: 0 })),
    deductions: formatCurrency(faker.finance.amount({ min: 20000, max: 80000, dec: 0 })),
    taxableIncome: formatCurrency(faker.finance.amount({ min: 400000, max: 1200000, dec: 0 })),
    taxDeducted: formatCurrency(faker.finance.amount({ min: 10000, max: 150000, dec: 0 })),
}));

const Step3_ReviewMergedData = ({ onVerified }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onVerified(e.target.checked);
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 3: Review & Confirm Merged Form 16 Data</h3>
            <p className="text-sm text-base-content/70">Please review the combined Part A and Part B data. Ensure all details are correct before proceeding to the digital signature step.</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>PAN</th>
                            <th>Employee Name</th>
                            <th>Gross Salary</th>
                            <th>Allowances</th>
                            <th>Deductions</th>
                            <th>Taxable Income</th>
                            <th>Tax Deducted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData.map(row => (
                            <tr key={row.pan}>
                                <td className="font-mono">{row.pan}</td>
                                <td>{row.name}</td>
                                <td>{row.grossSalary}</td>
                                <td>{row.allowances}</td>
                                <td>{row.deductions}</td>
                                <td>{row.taxableIncome}</td>
                                <td>{row.taxDeducted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="form-control mt-4 p-4 bg-base-200 rounded-lg">
                <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" className="checkbox checkbox-primary" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="label-text font-medium">I have verified all the details above and confirm they are correct for Form 16 generation.</span>
                </label>
            </div>
        </div>
    );
};

export default Step3_ReviewMergedData;
