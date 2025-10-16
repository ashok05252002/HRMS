import React from 'react';
import { Download } from 'lucide-react';

const Step3_ReviewMerged = ({ onVerified, partAData, partBData }) => {
    if (!partAData || !partBData) return <div>Loading data...</div>;

    const renderPartARow = (label, value) => (
        <tr>
            <td className="font-semibold bg-base-200">{label}</td>
            <td>{value}</td>
        </tr>
    );

    const renderPartBRow = (label, amount, isTotal = false) => (
        <tr className={isTotal ? 'bg-base-200 font-semibold' : ''}>
            <td className={isTotal ? 'font-semibold' : 'pl-8'}>{label}</td>
            <td className="text-right">{Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 3: Preview Final Form 16</h3>
            <p className="text-sm text-base-content/70">This is a preview of the merged Form 16. Please review it carefully before proceeding to digital signature.</p>
            
            <div className="p-6 border rounded-lg prose max-w-none">
                <h2 className="text-center">FORM NO. 16</h2>
                <div className="divider">PART A</div>
                <table className="table w-full table-compact">
                    <tbody>
                        {renderPartARow("Employer Name", partAData.employer.name)}
                        {renderPartARow("Employee Name", partAData.employee.name)}
                        {renderPartARow("Assessment Year", partAData.assessmentYear)}
                        {renderPartARow("PAN of Employee", partAData.employee.pan)}
                        {renderPartARow("TAN of Deductor", partAData.employer.tan)}
                    </tbody>
                </table>

                <div className="divider">PART B</div>
                <table className="table w-full">
                    <tbody>
                        {renderPartBRow("Gross Salary", partBData.grossSalary.total, true)}
                        {renderPartBRow("Less: Exempt Allowances", partBData.exemptAllowances.total, true)}
                        {renderPartBRow("Balance", partBData.salaryReceived, true)}
                        {renderPartBRow("Less: Deductions u/s 16", partBData.deductions_sec16.total, true)}
                        {renderPartBRow("Income chargeable under 'Salaries'", partBData.incomeChargeable, true)}
                        {renderPartBRow("Gross Total Income", partBData.grossTotalIncome, true)}
                        {renderPartBRow("Less: Deductions under Chapter VI-A", partBData.chapterVI_A_Deductions.total, true)}
                        {renderPartBRow("Total Taxable Income", partBData.totalTaxableIncome, true)}
                        {renderPartBRow("Net Tax Payable", partBData.netTaxPayable, true)}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end gap-2">
                <button className="btn btn-ghost">Back</button>
                <button className="btn btn-outline"><Download size={16} /> Download PDF</button>
                <button onClick={onVerified} className="btn btn-primary">Looks Good, Continue to Sign</button>
            </div>
        </div>
    );
};

export default Step3_ReviewMerged;
