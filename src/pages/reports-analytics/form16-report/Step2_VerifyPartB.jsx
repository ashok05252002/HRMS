import React from 'react';
import { faker } from '@faker-js/faker';

const generateDummyData = () => {
    const grossSalary = faker.finance.amount({ min: 500000, max: 1500000, dec: 2 });
    const hra = faker.finance.amount({ min: 100000, max: 300000, dec: 2 });
    const standardDeduction = 50000.00;
    const incomeChargeable = grossSalary - hra - standardDeduction;
    const totalDeductions = faker.finance.amount({ min: 50000, max: 150000, dec: 2 });
    const taxableIncome = incomeChargeable - totalDeductions;
    const tax = taxableIncome * 0.1; // Simplified
    const cess = tax * 0.04;
    const netTax = tax + cess;

    return {
        grossSalary: {
            section17_1: grossSalary,
            total: grossSalary
        },
        exemptAllowances: {
            hra: hra,
            total: hra
        },
        salaryReceived: grossSalary - hra,
        deductions_sec16: {
            standard: standardDeduction,
            total: standardDeduction
        },
        incomeChargeable: incomeChargeable,
        grossTotalIncome: incomeChargeable,
        chapterVI_A_Deductions: {
            total: totalDeductions
        },
        totalTaxableIncome: taxableIncome,
        taxOnIncome: tax,
        cess: cess,
        netTaxPayable: netTax
    };
};

const Step2_VerifyPartB = ({ onVerified }) => {
    const data = generateDummyData();

    const renderRow = (label, amount, isBold = false, isTotal = false) => (
        <tr className={isTotal ? 'bg-base-200 font-semibold' : ''}>
            <td className={isBold ? 'font-semibold' : 'pl-8'}>{label}</td>
            <td className="text-right">{Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 2: Review Part B Details</h3>
            <p className="text-sm text-base-content/70">Please review the salary and deduction details from the system. This data will be merged with Part A.</p>
            
            <div className="p-6 border rounded-lg bg-base-200">
                <div className="text-center font-bold mb-4">DETAILS OF SALARY PAID AND ANY OTHER INCOME AND TAX DEDUCTED</div>
                <table className="table w-full">
                    <tbody>
                        {renderRow("1. Gross Salary", null, true)}
                        {renderRow("(a) Salary as per provisions contained in section 17(1)", data.grossSalary.section17_1)}
                        {renderRow("(d) Total", data.grossSalary.total, false, true)}

                        {renderRow("2. Less: Allowances to the extent exempt under section 10", null, true)}
                        {renderRow("(e) House rent allowance under section 10(13A)", data.exemptAllowances.hra)}
                        {renderRow("(h) Total amount of exemption claimed under section 10", data.exemptAllowances.total, false, true)}

                        {renderRow("3. Total amount of salary received from current employer", data.salaryReceived, true, true)}

                        {renderRow("4. Less: Deductions under section 16", null, true)}
                        {renderRow("(a) Standard deduction under section 16(ia)", data.deductions_sec16.standard)}
                        {renderRow("5. Total amount of deductions under section 16", data.deductions_sec16.total, true, true)}

                        {renderRow("6. Income chargeable under the head 'Salaries'", data.incomeChargeable, true, true)}
                        {renderRow("9. Gross total income", data.grossTotalIncome, true, true)}

                        {renderRow("11. Aggregate of deductible amount under Chapter VI-A", data.chapterVI_A_Deductions.total, true, true)}
                        {renderRow("12. Total taxable income", data.totalTaxableIncome, true, true)}

                        {renderRow("13. Tax on total income", data.taxOnIncome, true)}
                        {renderRow("16. Health and education cess", data.cess, true)}
                        {renderRow("19. Net tax payable", data.netTaxPayable, true, true)}
                    </tbody>
                </table>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-primary" />
                    <span className="label-text ml-2">I have verified all details in Part B and confirm they are correct.</span>
                </label>
            </div>
            <div className="flex justify-end gap-2">
                <button className="btn btn-ghost">Back</button>
                <button onClick={() => onVerified(data)} className="btn btn-primary">Confirm & Continue</button>
            </div>
        </div>
    );
};

export default Step2_VerifyPartB;
