import React, { useState } from 'react';
import { Download, Upload, Eye, Info } from 'lucide-react';

const formatCurrency = (value) => `INR ${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Static, correctly calculated data for 10 employees for August (31 days)
const staticPayslipData = [
  { id: 'PR101', name: 'Aarav Sharma', designation: 'Sr. Software Engineer', department: 'Engineering', pan: 'ABCDE1234F', bankAccount: '...1234', grossMonthlySalary: 80000, presentDays: 24, holidays: 1, weeklyOffs: 4, lopDays: 2, otHours: 10 },
  { id: 'PR102', name: 'Diya Patel', designation: 'UI/UX Designer', department: 'Design', pan: 'FGHIJ5678K', bankAccount: '...5678', grossMonthlySalary: 65000, presentDays: 26, holidays: 1, weeklyOffs: 4, lopDays: 0, otHours: 5 },
  { id: 'PR103', name: 'Rohan Mehta', designation: 'Product Manager', department: 'Product', pan: 'LMNOP9012L', bankAccount: '...9012', grossMonthlySalary: 95000, presentDays: 25, holidays: 1, weeklyOffs: 4, lopDays: 1, otHours: 0 },
  { id: 'PR104', name: 'Isha Singh', designation: 'QA Engineer', department: 'Engineering', pan: 'QRSTU3456M', bankAccount: '...3456', grossMonthlySalary: 50000, presentDays: 26, holidays: 1, weeklyOffs: 4, lopDays: 0, otHours: 2 },
  { id: 'PR105', name: 'Vikram Rao', designation: 'DevOps Engineer', department: 'Engineering', pan: 'VWXYZ7890N', bankAccount: '...7890', grossMonthlySalary: 75000, presentDays: 23, holidays: 1, weeklyOffs: 4, lopDays: 3, otHours: 8 },
  { id: 'PR106', name: 'Ananya Reddy', designation: 'HR Executive', department: 'Human Resources', pan: 'BCDEA1234P', bankAccount: '...1122', grossMonthlySalary: 55000, presentDays: 26, holidays: 1, weeklyOffs: 4, lopDays: 0, otHours: 12 },
  { id: 'PR107', name: 'Arjun Nair', designation: 'Marketing Specialist', department: 'Marketing', pan: 'FGHIJ5678Q', bankAccount: '...3344', grossMonthlySalary: 60000, presentDays: 25, holidays: 1, weeklyOffs: 4, lopDays: 1, otHours: 4 },
  { id: 'PR108', name: 'Saanvi Gupta', designation: 'Jr. Accountant', department: 'Finance', pan: 'LMNOP9012R', bankAccount: '...5566', grossMonthlySalary: 48000, presentDays: 24, holidays: 1, weeklyOffs: 4, lopDays: 2, otHours: 0 },
  { id: 'PR109', name: 'Kabir Kumar', designation: 'Team Lead', department: 'Engineering', pan: 'QRSTU3456S', bankAccount: '...7788', grossMonthlySalary: 120000, presentDays: 26, holidays: 1, weeklyOffs: 4, lopDays: 0, otHours: 0 },
  { id: 'PR110', name: 'Myra Joshi', designation: 'Graphic Designer', department: 'Design', pan: 'VWXYZ7890T', bankAccount: '...9900', grossMonthlySalary: 45000, presentDays: 25, holidays: 1, weeklyOffs: 4, lopDays: 1, otHours: 6 },
].map(emp => {
    const daysInMonth = 31;
    const perDaySalary = emp.grossMonthlySalary / daysInMonth;
    const lopDeduction = perDaySalary * emp.lopDays;

    const perHourOtAmount = (perDaySalary / 8) * 1.5; // Assuming 8-hour day and 1.5x OT rate
    const otAmount = emp.otHours * perHourOtAmount;

    // Earnings are based on full gross salary
    const earnings = {
        basic: emp.grossMonthlySalary * 0.5,
        hra: emp.grossMonthlySalary * 0.25,
        specialAllowance: emp.grossMonthlySalary * 0.25,
        otPay: otAmount, // OT is an extra earning
    };

    // Deductions now include LOP
    const deductions = {
        lop: lopDeduction,
        pf: (emp.grossMonthlySalary * 0.5) * 0.12, // PF on Basic
        esi: emp.grossMonthlySalary <= 21000 ? emp.grossMonthlySalary * 0.0075 : 0,
        pt: emp.grossMonthlySalary > 10000 ? 200 : 0,
        tds: (emp.grossMonthlySalary > 41666) ? (emp.grossMonthlySalary - 41666) * 0.1 : 0, // Simplified TDS
    };
    
    return { ...emp, perDaySalary, perHourOtAmount, otAmount, earnings, deductions };
});


const PayslipGenerator = () => {
    const [payslips] = useState(staticPayslipData);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleView = (payslip) => {
        setSelectedPayslip(payslip);
        setShowViewModal(true);
    };

    const renderViewModal = () => {
        if (!selectedPayslip) return null;

        const totalEarnings = selectedPayslip.grossMonthlySalary + selectedPayslip.earnings.otPay;
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                                <p><strong>Employee Name:</strong> {selectedPayslip.name}</p>
                                <p><strong>Designation:</strong> {selectedPayslip.designation}</p>
                                <p><strong>Department:</strong> {selectedPayslip.department}</p>
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
                                        <th>Total Days</th><td>{selectedPayslip.presentDays + selectedPayslip.holidays + selectedPayslip.weeklyOffs + selectedPayslip.lopDays}</td>
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
                                    <tr>
                                        <td className="align-top">
                                            Overtime Pay
                                            <div className="text-xs text-base-content/60">({selectedPayslip.otHours} hrs @ {formatCurrency(selectedPayslip.perHourOtAmount)}/hr)</div>
                                        </td>
                                        <td className="text-right align-top">{formatCurrency(selectedPayslip.earnings.otPay)}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="font-bold bg-base-300"><td>Total Earnings</td><td className="text-right">{formatCurrency(totalEarnings)}</td></tr>
                                </tfoot>
                            </table>
                            <table className="table table-sm">
                                <thead><tr className="bg-base-300"><th>Deductions</th><th className="text-right">Amount</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td className="align-top">
                                            Loss of Pay (LOP)
                                            <div className="text-xs text-base-content/60">({selectedPayslip.lopDays} days @ {formatCurrency(selectedPayslip.perDaySalary)}/day)</div>
                                        </td>
                                        <td className="text-right align-top">{formatCurrency(selectedPayslip.deductions.lop)}</td>
                                    </tr>
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
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">Payslip Generator</h1>
                        <button onClick={() => setShowInfoModal(true)} className="btn btn-ghost btn-circle btn-sm">
                            <Info size={18} className="text-base-content/50" />
                        </button>
                    </div>
                    <p className="text-base-content/70">Upload attendance data to generate monthly payslips.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-outline"><Download size={16} /> Download Template</button>
                    <button className="btn btn-primary"><Upload size={16} /> Upload Attendance</button>
                </div>
            </div>

            {showViewModal && renderViewModal()}

            {showInfoModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Payslip Calculation Formulas</h3>
                        <ul className="list-disc list-inside text-sm space-y-2 py-4">
                            <li><strong>Per Day Salary:</strong> Gross Monthly Salary / Days in Month</li>
                            <li><strong>LOP Deduction:</strong> Per Day Salary * LOP Days</li>
                            <li><strong>Per Hour OT:</strong> (Per Day Salary / 8) * 1.5</li>
                            <li><strong>OT Amount:</strong> Per Hour OT Amount * OT Hours</li>
                            <li><strong>Total Earnings:</strong> Gross Monthly Salary + OT Amount</li>
                            <li><strong>Total Deductions:</strong> LOP + PF + ESI + PT + TDS</li>
                            <li><strong>Net Salary:</strong> Total Earnings - Total Deductions</li>
                        </ul>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowInfoModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

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
                                {payslips.map(p => {
                                    const totalEarnings = p.grossMonthlySalary + p.earnings.otPay;
                                    const totalDeductions = Object.values(p.deductions).reduce((s, v) => s + v, 0);
                                    const netSalary = totalEarnings - totalDeductions;
                                    return (
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
                                            <td className="font-semibold">{formatCurrency(netSalary)}</td>
                                            <td>
                                                <button className="btn btn-sm btn-ghost" onClick={() => handleView(p)}>
                                                    <Eye size={16} /> View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayslipGenerator;
