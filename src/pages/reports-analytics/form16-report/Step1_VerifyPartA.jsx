import React from 'react';

const Step1_VerifyPartA = ({ onVerified }) => {
    const data = {
        employer: {
            name: "METLORD ALLOYS PRIVATE LIMITED",
            address: "7/A-63 5th Street, Periyar Nagar, CHENNAI - 600082, Tamil Nadu",
            email: "metlordalloys@gmail.com",
            pan: "AAICM9754G",
            tan: "CHEM15550D"
        },
        employee: {
            name: "GUNASEKARAN HEMANTH",
            address: "NO 22, RAM NAGAR TIRUR POST, SEVVAPET, THIRUVALLUR - 602025, Tamil Nadu",
            pan: "AMCPH0968G"
        },
        assessmentYear: "2022-23",
        period: { from: "01-Apr-2021", to: "31-Mar-2022" },
        citTds: "The Commissioner of Income Tax (TDS), 7th Floor, New Block, Aayakar Bhawan, 121 , M.G. Road, Chennai - 600034",
        summary: { quarter: "Q4", receipt: "QVBGBSPB", credited: "138750.00", deducted: "100.00", deposited: "100.00" },
        challans: [
            { deposited: "0.00", date: "07-10-2022", status: "F" },
            { deposited: "100.00", bsr: "0014431", date: "07-10-2022", serial: "04626", status: "F" },
            { deposited: "0.00", date: "07-10-2022", status: "F" }
        ],
        certificateNo: "UVJFMRA",
        lastUpdated: "13-Oct-2022",
        verifier: { name: "SRIKANT", designation: "DIRECTOR", place: "CHENNAI", date: "23-Jan-2023" }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 1: Verify Part A Details</h3>
            <p className="text-sm text-base-content/70">Please review the TRACES data for the employee. Ensure all details are correct before proceeding.</p>
            
            <div className="p-6 border rounded-lg bg-base-200">
                <div className="text-center font-bold mb-4">FORM NO. 16 - PART A</div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
                    <div>
                        <div className="font-semibold">Name and address of the Employer</div>
                        <p>{data.employer.name}<br/>{data.employer.address}</p>
                    </div>
                     <div>
                        <div className="font-semibold">Name and address of the Employee</div>
                        <p>{data.employee.name}<br/>{data.employee.address}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 border-b pb-4 mb-4">
                    <div><span className="font-semibold">PAN of Deductor:</span> {data.employer.pan}</div>
                    <div><span className="font-semibold">TAN of Deductor:</span> {data.employer.tan}</div>
                    <div><span className="font-semibold">PAN of Employee:</span> {data.employee.pan}</div>
                    <div><span className="font-semibold">Assessment Year:</span> {data.assessmentYear}</div>
                    <div className="col-span-2"><span className="font-semibold">Period:</span> {data.period.from} to {data.period.to}</div>
                </div>
                <div className="font-semibold mb-2">Summary of amount paid/credited and tax deducted at source</div>
                <table className="table table-bordered table-sm w-full mb-4">
                    <thead><tr><th>Quarter(s)</th><th>Amount paid/credited (Rs.)</th><th>Amount of tax deducted (Rs.)</th><th>Amount of tax deposited (Rs.)</th></tr></thead>
                    <tbody><tr><td>{data.summary.quarter}</td><td>{data.summary.credited}</td><td>{data.summary.deducted}</td><td>{data.summary.deposited}</td></tr></tbody>
                </table>
                <div className="font-semibold mb-2">II. DETAILS OF TAX DEDUCTED AND DEPOSITED THROUGH CHALLAN</div>
                <table className="table table-bordered table-sm w-full mb-4">
                    <thead><tr><th>BSR Code</th><th>Date of Deposit</th><th>Challan Serial No.</th><th>Tax Deposited (Rs.)</th><th>Status</th></tr></thead>
                    <tbody>
                        {data.challans.map((c, i) => <tr key={i}><td>{c.bsr || '-'}</td><td>{c.date}</td><td>{c.serial || '-'}</td><td>{c.deposited}</td><td>{c.status}</td></tr>)}
                    </tbody>
                </table>
                <div className="text-center border-t pt-4 mt-4">
                    <p>I, {data.verifier.name}, do hereby certify that a sum of Rs. {data.summary.deducted} has been deducted and deposited to the credit of the Central Government.</p>
                    <div className="flex justify-around mt-4">
                        <div><strong>Place:</strong> {data.verifier.place}</div>
                        <div><strong>Date:</strong> {data.verifier.date}</div>
                        <div><strong>Designation:</strong> {data.verifier.designation}</div>
                    </div>
                </div>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-primary" />
                    <span className="label-text ml-2">I have verified all details in Part A and confirm they are correct.</span>
                </label>
            </div>
            <div className="flex justify-end">
                <button onClick={() => onVerified(data)} className="btn btn-primary">Confirm & Continue</button>
            </div>
        </div>
    );
};

export default Step1_VerifyPartA;
