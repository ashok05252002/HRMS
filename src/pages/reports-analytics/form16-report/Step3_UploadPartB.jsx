import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const generateDummyData = () => ({
    grossSalary: {
        salary171: formatCurrency(faker.finance.amount({ min: 800000, max: 1200000 })),
        perquisites172: formatCurrency(faker.finance.amount({ min: 50000, max: 100000 })),
        profits173: formatCurrency(faker.finance.amount({ min: 0, max: 20000 })),
        total: formatCurrency(1320000), // Example fixed total
        otherEmployer: formatCurrency(0),
    },
    exemptAllowances: {
        travel: formatCurrency(0),
        gratuity: formatCurrency(0),
        pension: formatCurrency(0),
        leaveEncashment: formatCurrency(0),
        hra: formatCurrency(faker.finance.amount({ min: 100000, max: 200000 })),
        other: formatCurrency(0),
        total: formatCurrency(200000), // Example fixed total
    },
    deductions16: {
        standard: formatCurrency(50000),
        entertainment: formatCurrency(0),
        employmentTax: formatCurrency(2400),
        total: formatCurrency(52400),
    },
    otherIncome: {
        houseProperty: formatCurrency(0),
        otherSources: formatCurrency(faker.finance.amount({ min: 0, max: 10000 })),
        total: formatCurrency(10000),
    },
    deductionsVI: {
        c80: { gross: formatCurrency(150000), deductible: formatCurrency(150000) },
        ccc80: { gross: formatCurrency(0), deductible: formatCurrency(0) },
        ccd1_80: { gross: formatCurrency(0), deductible: formatCurrency(0) },
        ccd1b_80: { gross: formatCurrency(50000), deductible: formatCurrency(50000) },
        ccd2_80: { gross: formatCurrency(faker.finance.amount({min: 20000, max: 40000})), deductible: formatCurrency(faker.finance.amount({min: 20000, max: 40000})) },
        d80: { gross: formatCurrency(25000), deductible: formatCurrency(25000) },
        e80: { gross: formatCurrency(0), deductible: formatCurrency(0) },
        g80: { gross: formatCurrency(0), qualifying: formatCurrency(0), deductible: formatCurrency(0) },
        tta80: { gross: formatCurrency(faker.finance.amount({min: 0, max: 10000})), qualifying: formatCurrency(10000), deductible: formatCurrency(10000) },
        total: formatCurrency(275000), // Example total
    },
    taxCalculation: {
        totalTaxable: formatCurrency(802600),
        taxOnIncome: formatCurrency(73020),
        rebate87a: formatCurrency(0),
        surcharge: formatCurrency(0),
        cess: formatCurrency(2921),
        taxPayable: formatCurrency(75941),
        relief89: formatCurrency(0),
        netTax: formatCurrency(75941),
    }
});

const DetailRow = ({ label, value, isTotal = false, indent = 0 }) => (
    <div className={`flex justify-between py-1 border-b border-base-200 ${isTotal ? 'font-bold' : ''}`} style={{ marginLeft: `${indent * 1.5}rem` }}>
        <span>{label}</span>
        <span>{value}</span>
    </div>
);

const DeductionRow = ({ label, gross, qualifying, deductible }) => (
    <div className="grid grid-cols-4 py-1 border-b border-base-200">
        <span className="col-span-1">{label}</span>
        <span className="text-right">{gross}</span>
        <span className="text-right">{qualifying}</span>
        <span className="text-right">{deductible}</span>
    </div>
);


const Step3_VerifyPartB_System = ({ onVerified }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [data] = useState(generateDummyData());

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onVerified(e.target.checked);
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 3: Review Part B Details</h3>
            <p className="text-sm text-base-content/70">Please review the salary details sourced from the payroll system. This data will be used for Part B of Form 16.</p>
            
            <div className="prose max-w-none p-4 border rounded-lg bg-base-100">
                <h4 className="font-bold text-center">Details of Salary Paid and any other income and tax deducted</h4>
                
                <div className="space-y-2 text-sm">
                    <DetailRow label="1. Gross Salary" value="" isTotal />
                    <DetailRow label="(a) Salary as per provisions contained in section 17(1)" value={data.grossSalary.salary171} indent={1} />
                    <DetailRow label="(b) Value of perquisites under section 17(2)" value={data.grossSalary.perquisites172} indent={1} />
                    <DetailRow label="(c) Profits in lieu of salary under section 17(3)" value={data.grossSalary.profits173} indent={1} />
                    <DetailRow label="(d) Total" value={data.grossSalary.total} isTotal indent={1} />
                    <DetailRow label="(e) Reported total amount of salary received from other employer(s)" value={data.grossSalary.otherEmployer} indent={1} />

                    <DetailRow label="2. Less: Allowances to the extent exempt under section 10" value="" isTotal />
                    <DetailRow label="(e) House rent allowance under section 10(13A)" value={data.exemptAllowances.hra} indent={1} />
                    <DetailRow label="(h) Total amount of exemption claimed under section 10" value={data.exemptAllowances.total} isTotal indent={1} />

                    <DetailRow label="3. Total amount of salary received from current employer [1(d)-2(h)]" value={formatCurrency(1120000)} isTotal />
                    
                    <DetailRow label="4. Less: Deductions under section 16" value="" isTotal />
                    <DetailRow label="(a) Standard deduction under section 16(ia)" value={data.deductions16.standard} indent={1} />
                    <DetailRow label="(c) Tax on employment under section 16(iii)" value={data.deductions16.employmentTax} indent={1} />
                    
                    <DetailRow label="5. Total amount of deductions under section 16" value={data.deductions16.total} isTotal />
                    
                    <DetailRow label='6. Income chargeable under the head "Salaries" [(3+1(e)-5]' value={formatCurrency(1067600)} isTotal />
                    
                    <DetailRow label="7. Add: Any other income reported by the employee" value="" isTotal />
                    <DetailRow label="(b) Income under the head Other Sources offered for TDS" value={data.otherIncome.otherSources} indent={1} />
                    <DetailRow label="8. Total amount of other income reported by the employee" value={data.otherIncome.total} isTotal />
                    
                    <DetailRow label="9. Gross total income (6+8)" value={formatCurrency(1077600)} isTotal />
                    
                    <h5 className="font-bold pt-4">10. Deductions under Chapter VI-A</h5>
                    <div className="grid grid-cols-4 font-semibold text-xs text-right border-b pb-1">
                        <span className="text-left"></span><span>Gross Amount</span><span>Qualifying Amount</span><span>Deductible Amount</span>
                    </div>
                    <DeductionRow label="(a) under section 80C" gross={data.deductionsVI.c80.gross} qualifying={data.deductionsVI.c80.gross} deductible={data.deductionsVI.c80.deductible} />
                    <DeductionRow label="(e) under section 80CCD(1B)" gross={data.deductionsVI.ccd1b_80.gross} qualifying={data.deductionsVI.ccd1b_80.gross} deductible={data.deductionsVI.ccd1b_80.deductible} />
                    <DeductionRow label="(f) under section 80CCD(2)" gross={data.deductionsVI.ccd2_80.gross} qualifying={data.deductionsVI.ccd2_80.gross} deductible={data.deductionsVI.ccd2_80.deductible} />
                    <DeductionRow label="(g) under section 80D" gross={data.deductionsVI.d80.gross} qualifying={data.deductionsVI.d80.gross} deductible={data.deductionsVI.d80.deductible} />
                    <DeductionRow label="(j) under section 80TTA" gross={data.deductionsVI.tta80.gross} qualifying={data.deductionsVI.tta80.qualifying} deductible={data.deductionsVI.tta80.deductible} />
                    
                    <DetailRow label="11. Aggregate of deductible amount under Chapter VI-A" value={data.deductionsVI.total} isTotal />
                    
                    <DetailRow label="12. Total taxable income (9-11)" value={data.taxCalculation.totalTaxable} isTotal />
                    <DetailRow label="13. Tax on total income" value={data.taxCalculation.taxOnIncome} isTotal />
                    <DetailRow label="14. Rebate under section 87A, if applicable" value={data.taxCalculation.rebate87a} />
                    <DetailRow label="15. Surcharge, wherever applicable" value={data.taxCalculation.surcharge} />
                    <DetailRow label="16. Health and education cess" value={data.taxCalculation.cess} />
                    <DetailRow label="17. Tax payable (13+15+16-14)" value={data.taxCalculation.taxPayable} isTotal />
                    <DetailRow label="18. Less: Relief under section 89" value={data.taxCalculation.relief89} />
                    <DetailRow label="19. Net tax payable (17-18)" value={data.taxCalculation.netTax} isTotal />
                </div>
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

export default Step3_VerifyPartB_System;
