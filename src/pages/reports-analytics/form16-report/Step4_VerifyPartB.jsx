import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Download } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const generateDummyData = () => ({
    partA: {
        name: faker.person.fullName(),
        pan: `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`,
        address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })} ${faker.location.zipCode()}`,
        employerName: 'Pro-People Inc.',
        employerPan: 'ABCDE1234F',
        employerTan: 'MUMJ12345E',
        assessmentYear: '2025-26',
        period: '2024-04-01 to 2025-03-31',
        taxDeducted: formatCurrency(75941),
    },
    partB: {
        grossSalary: {
            salary171: formatCurrency(faker.finance.amount({ min: 800000, max: 1200000 })),
            perquisites172: formatCurrency(faker.finance.amount({ min: 50000, max: 100000 })),
            total: formatCurrency(1320000),
        },
        exemptAllowances: {
            hra: formatCurrency(faker.finance.amount({ min: 100000, max: 200000 })),
            total: formatCurrency(200000),
        },
        deductions16: {
            standard: formatCurrency(50000),
            total: formatCurrency(52400),
        },
        otherIncome: {
            total: formatCurrency(10000),
        },
        deductionsVI: {
            total: formatCurrency(275000),
        },
        taxCalculation: {
            totalTaxable: formatCurrency(802600),
            taxOnIncome: formatCurrency(73020),
            cess: formatCurrency(2921),
            taxPayable: formatCurrency(75941),
            netTax: formatCurrency(75941),
        }
    }
});

const DetailRow = ({ label, value, isTotal = false, indent = 0 }) => (
    <div className={`flex justify-between py-1 border-b border-gray-200 ${isTotal ? 'font-bold' : ''}`} style={{ marginLeft: `${indent * 1}rem` }}>
        <span className="text-gray-600">{label}</span>
        <span>{value}</span>
    </div>
);

const Step4_ReviewMergedData = ({ onVerified }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [data] = useState(generateDummyData());

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onVerified(e.target.checked);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Step 4: Preview Final Form 16</h3>
                <button className="btn btn-secondary btn-sm">
                    <Download size={16} /> Download PDF
                </button>
            </div>
            <p className="text-sm text-base-content/70">This is a preview of the final merged Form 16. Please review carefully before signing.</p>
            
            <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto text-sm text-gray-800">
                <h2 className="text-xl font-bold text-center mb-2">FORM NO. 16</h2>
                <p className="text-center font-semibold">[See rule 31(1)(a)]</p>
                <p className="text-center font-bold mb-6">PART B</p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 border p-4 rounded-lg mb-6">
                    <div><span className="font-semibold">Name and address of the employee:</span><br/>{data.partA.name}<br/>{data.partA.address}</div>
                    <div><span className="font-semibold">PAN of the employee:</span> {data.partA.pan}</div>
                    <div><span className="font-semibold">Name and address of the employer:</span><br/>{data.partA.employerName}</div>
                    <div><span className="font-semibold">PAN of the employer:</span> {data.partA.employerPan}</div>
                    <div><span className="font-semibold">TAN of the employer:</span> {data.partA.employerTan}</div>
                    <div><span className="font-semibold">Assessment Year:</span> {data.partA.assessmentYear}</div>
                    <div><span className="font-semibold">Period with the employer:</span> {data.partA.period}</div>
                </div>

                <h4 className="font-bold text-center mb-4">Details of Salary Paid and any other income and tax deducted</h4>
                
                <div className="space-y-1">
                    <DetailRow label="1. Gross Salary" value="" isTotal />
                    <DetailRow label="(a) Salary as per section 17(1)" value={data.partB.grossSalary.salary171} indent={1} />
                    <DetailRow label="(b) Value of perquisites u/s 17(2)" value={data.partB.grossSalary.perquisites172} indent={1} />
                    <DetailRow label="(d) Total" value={data.partB.grossSalary.total} isTotal indent={1} />
                    
                    <DetailRow label="2. Less: Allowances exempt u/s 10" value="" isTotal />
                    <DetailRow label="(h) Total exemption u/s 10" value={data.partB.exemptAllowances.total} isTotal indent={1} />
                    
                    <DetailRow label="3. Total salary received from current employer" value={formatCurrency(1120000)} isTotal />
                    
                    <DetailRow label="4. Less: Deductions u/s 16" value="" isTotal />
                    <DetailRow label="(a) Standard deduction" value={data.partB.deductions16.standard} indent={1} />
                    
                    <DetailRow label="5. Total deductions u/s 16" value={data.partB.deductions16.total} isTotal />
                    
                    <DetailRow label='6. Income chargeable under "Salaries"' value={formatCurrency(1067600)} isTotal />
                    
                    <DetailRow label="8. Total other income" value={data.partB.otherIncome.total} isTotal />
                    
                    <DetailRow label="9. Gross total income (6+8)" value={formatCurrency(1077600)} isTotal />
                    
                    <DetailRow label="11. Aggregate of deductible amount under Chapter VI-A" value={data.partB.deductionsVI.total} isTotal />
                    
                    <DetailRow label="12. Total taxable income (9-11)" value={data.partB.taxCalculation.totalTaxable} isTotal />
                    <DetailRow label="13. Tax on total income" value={data.partB.taxCalculation.taxOnIncome} isTotal />
                    <DetailRow label="16. Health and education cess" value={data.partB.taxCalculation.cess} />
                    <DetailRow label="17. Tax payable" value={data.partB.taxCalculation.taxPayable} isTotal />
                    <DetailRow label="19. Net tax payable" value={data.partB.taxCalculation.netTax} isTotal />
                </div>
                
                <div className="divider"></div>
                
                <div className="text-center mt-6">
                    <p className="font-bold">Verification</p>
                    <p className="text-xs mt-2">I, Mr. Finance Head, son/daughter of ..., working in the capacity of Finance Head (Designation) do hereby certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, and other available records.</p>
                </div>
            </div>

            <div className="form-control mt-4 p-4 bg-base-200 rounded-lg">
                <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" className="checkbox checkbox-primary" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="label-text font-medium">I have verified the final merged Form 16 and confirm it is correct for signing.</span>
                </label>
            </div>
        </div>
    );
};

export default Step4_ReviewMergedData;
