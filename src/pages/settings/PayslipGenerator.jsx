import React, { useState } from 'react';
import { Download, Upload, Eye, FileText } from 'lucide-react';
import { faker } from '@faker-js/faker';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const generatePayslipData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const gross = faker.finance.amount({ min: 30000, max: 100000, dec: 0 });
        const deductions = faker.finance.amount({ min: 2000, max: 10000, dec: 0 });
        const otHours = faker.number.int({ min: 0, max: 10 });
        const perHourOtAmount = 250;

        data.push({
            id: `PR${101 + i}`,
            name: faker.person.fullName(),
            designation: faker.person.jobTitle(),
            department: faker.commerce.department(),
            pan: `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`,
            bankAccount: faker.finance.accountNumber(),
            presentDays: faker.number.int({ min: 20, max: 24 }),
            holidays: 2,
            weeklyOffs: 4,
            lopDays: faker.number.int({ min: 0, max: 2 }),
            otHours: otHours,
            perDaySalary: gross / 30,
            perHourOtAmount: perHourOtAmount,
            otAmount: otHours * perHourOtAmount,
            earnings: {
                basic: gross * 0.5,
                hra: gross * 0.25,
                specialAllowance: gross * 0.25,
                otPay: otHours * perHourOtAmount,
            },
            deductions: {
                pf: deductions * 0.6,
                esi: deductions * 0.1,
                pt: 200,
                tds: deductions * 0.3,
            },
        });
    }
    return data;
};

const PayslipGenerator = () => {
    const [payslips, setPayslips] = useState(() => generatePayslipData(10));
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);

    const handleView = (payslip) => {
        setSelectedPayslip(payslip);
        setShowViewModal(true);
    };

    const renderViewModal = () => {
        if (!selectedPayslip) return null;

        const totalEarnings = Object.values(selectedPayslip.earnings).reduce((sum, val) => sum + val, 0);
        const totalDeductions = Object.values(selectedPayslip.deductions).reduce((sum, val) => sum + val, 0);
        const netSalary = totalEarnings - totalDeductions;

        return (
            <div className="modal modal-open">
                <div className="modal-box w-11/12 max-w-4xl">
                    <div className="p-4 bg-base-200 rounded-lg">
                        <div className="text-center mb-4">
                            <h3 className="font-bold text-xl">HRMS</h3>
                            <p>Payslip for the Month of August 2025</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                                <p><strong>Employee Name:</strong> {selectedPayslip.name}</p>
                                <p><strong>Designation:</strong> {selectedPayslip.designation}</p>
                                <p><strong>Department:</strong> {selectedPayslip.department}</p>
                            </div>
                            <div>
                                <p><strong>Per Day Salary:</strong> {formatCurrency(selectedPayslip.perDaySalary)}</p>
                                <p><strong>Per Hour OT Amount:</strong> {formatCurrency(selectedPayslip.perHourOtAmount)}</p>
                                <p><strong>Total OT Amount:</strong> {formatCurrency(selectedPayslip.otAmount)}</p>
                            </div>
                            <div className="text-left md:text-right">
                                <p><strong>Employee Code:</strong> {selectedPayslip.id}</p>
                                <p><strong>PAN:</strong> {selectedPayslip.pan}</p>
                                <p><strong>Bank Account:</strong> {selectedPayslip.bankAccount}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto mb-4">
                            <table className="table table-bordered table-sm">
                                <thead><tr className="bg-base-300"><th colSpan="6" className="text-center">Attendance Details</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <th>Present Days</th><td>{selectedPayslip.presentDays}</td>
                                        <th>Holidays</th><td>{selectedPayslip.holidays}</td>
                                        <th>Weekly Offs</th><td>{selectedPayslip.weeklyOffs}</td>
                                    </tr>
                                    <tr>
                                        <th>LOP Days</th><td>{selectedPayslip.lopDays}</td>
                                        <th>OT Hours</th><td>{selectedPayslip.otHours}</td>
                                        <th></th><td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <table className="table table-sm">
                                <thead><tr className="bg-base-300"><th>Earnings</th><th className="text-right">Amount</th></tr></thead>
                                <tbody>
                                    <tr><td>Basic</td><td className="text-right">{formatCurrency(selectedPayslip.earnings.basic)}</td></tr>
                                    <tr><td>House Rent Allowance (HRA)</td><td className="text-right">{formatCurrency(selectedPayslip.earnings.hra)}</td></tr>
                                    <tr><td>Special Allowance</td><td className="text-right">{formatCurrency(selectedPayslip.earnings.specialAllowance)}</td></tr>
                                    <tr><td>Overtime Pay</td><td className="text-right">{formatCurrency(selectedPayslip.earnings.otPay)}</td></tr>
                                </tbody>
                                <tfoot><tr className="font-bold bg-base-300"><td>Gross Earnings</td><td className="text-right">{formatCurrency(totalEarnings)}</td></tr></tfoot>
                            </table>
                            <table className="table table-sm">
                                <thead><tr className="bg-base-300"><th>Deductions</th><th className="text-right">Amount</th></tr></thead>
                                <tbody>
                                    <tr><td>Provident Fund (PF)</td><td className="text-right">{formatCurrency(selectedPayslip.deductions.pf)}</td></tr>
                                    <tr><td>Employee State Insurance (ESI)</td><td className="text-right">{formatCurrency(selectedPayslip.deductions.esi)}</td></tr>
                                    <tr><td>Professional Tax (PT)</td><td className="text-right">{formatCurrency(selectedPayslip.deductions.pt)}</td></tr>
                                    <tr><td>Income Tax (TDS)</td><td className="text-right">{formatCurrency(selectedPayslip.deductions.tds)}</td></tr>
                                </tbody>
                                <tfoot><tr className="font-bold bg-base-300"><td>Total Deductions</td><td className="text-right">{formatCurrency(totalDeductions)}</td></tr></tfoot>
                            </table>
                        </div>
                        
                        <div className="mt-4 p-4 bg-base-300 rounded-lg text-center">
                            <h4 className="font-bold text-lg">Net Salary: {formatCurrency(netSalary)}</h4>
                        </div>
                         <p className="text-xs text-center mt-4 text-base-content/60">This is a computer-generated payslip and does not require a signature.</p>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={() => setShowViewModal(false)}>Close</button>
                        <button className="btn btn-primary"><Download size={16} /> Download PDF</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Payslip Generator</h1>
                    <p className="text-base-content/70">Upload attendance data to generate monthly payslips.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-outline"><Download size={16} /> Download Template</button>
                    <button className="btn btn-primary"><Upload size={16} /> Upload Attendance</button>
                </div>
            </div>

            {showViewModal && renderViewModal()}

            <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h2 className="card-title">Generated Payslips - August 2025</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Present</th>
                                    <th>Holidays</th>
                                    <th>Weekly Offs</th>
                                    <th>LOP</th>
                                    <th>Per Day Salary</th>
                                    <th>OT (hrs)</th>
                                    <th>Per Hour OT</th>
                                    <th>OT Amount</th>
                                    <th>Net Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payslips.map(p => (
                                    <tr key={p.id}>
                                        <td><div>{p.name}</div><div className="text-xs opacity-50">{p.id}</div></td>
                                        <td>{p.presentDays}</td>
                                        <td>{p.holidays}</td>
                                        <td>{p.weeklyOffs}</td>
                                        <td>{p.lopDays}</td>
                                        <td>{formatCurrency(p.perDaySalary)}</td>
                                        <td>{p.otHours}</td>
                                        <td>{formatCurrency(p.perHourOtAmount)}</td>
                                        <td>{formatCurrency(p.otAmount)}</td>
                                        <td className="font-semibold">{formatCurrency(Object.values(p.earnings).reduce((s, v) => s + v, 0) - Object.values(p.deductions).reduce((s, v) => s + v, 0))}</td>
                                        <td>
                                            <button className="btn btn-sm btn-ghost" onClick={() => handleView(p)}>
                                                <Eye size={16} /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayslipGenerator;
