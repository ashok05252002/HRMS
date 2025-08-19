import React, { useState } from 'react';

const Step1_VerifyPartA = ({ onVerified }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onVerified(e.target.checked);
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Step 1: Verify Part A Data (from TRACES)</h3>
            <p className="text-sm text-base-content/70">Please review the data sourced from TRACES. Ensure all details are correct before proceeding.</p>

            <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto text-sm text-gray-800 border">
                <h2 className="text-xl font-bold text-center">FORM NO. 16</h2>
                <p className="text-center font-semibold">[See rule 31(1)(a)]</p>
                <p className="text-center mb-4">
                    Certificate under Section 203 of the Income-tax Act, 1961 for tax deducted at source on salary paid to an employee under section 192 or pension/interest income of specified senior citizen under section 194P
                </p>
                <p className="text-center text-xs mb-4">Certificate No. UVJFMRA | Last updated on 13-Oct-2022</p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 border p-4 rounded-lg mb-6">
                    <div>
                        <h4 className="font-bold">Name and address of the Employer/Specified Bank</h4>
                        <p>METLORD ALLOYS PRIVATE LIMITED<br />7/A-63 5th Street, Periyar Nagar,<br />CHENNAI - 600082, Tamil Nadu<br />metlordalloys@gmail.com</p>
                    </div>
                    <div>
                        <h4 className="font-bold">Name and address of the Employee/Specified senior citizen</h4>
                        <p>GUNASEKARAN HEMANTH<br />NO 22, RAM NAGAR TIRUR POST, SEVVAPET,<br />THIRUVALLUR - 602025, Tamil Nadu</p>
                    </div>
                    <div><span className="font-semibold">PAN of the Deductor:</span> AAICM9754G</div>
                    <div><span className="font-semibold">PAN of the Employee:</span> AMCPH0968G</div>
                    <div><span className="font-semibold">TAN of the Deductor:</span> CHEM15550D</div>
                    <div><span className="font-semibold">Assessment Year:</span> 2022-23</div>
                    <div className="col-span-2">
                        <span className="font-semibold">CIT (TDS):</span> The Commissioner of Income Tax (TDS), 7th Floor, New Block, Aayakar Bhawan, 121, M.G. Road, Chennai - 600034
                    </div>
                    <div><span className="font-semibold">Period From:</span> 01-Apr-2021</div>
                    <div><span className="font-semibold">Period To:</span> 31-Mar-2022</div>
                </div>

                <h4 className="font-bold mt-6 mb-2">Summary of amount paid/credited and tax deducted at source</h4>
                <div className="overflow-x-auto">
                    <table className="table table-bordered table-sm w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>Quarter(s)</th>
                                <th>Receipt No. of TDS Statement</th>
                                <th>Amount paid/credited (Rs.)</th>
                                <th>Tax Deducted (Rs.)</th>
                                <th>Tax Deposited (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Q4</td>
                                <td>QVBGBSPB</td>
                                <td>138750.00</td>
                                <td>100.00</td>
                                <td>100.00</td>
                            </tr>
                            <tr className="font-bold bg-base-200">
                                <td colSpan="2">Total (Rs.)</td>
                                <td>138750.00</td>
                                <td>100.00</td>
                                <td>100.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className="font-bold mt-6 mb-2">II. DETAILS OF TAX DEPOSITED THROUGH CHALLAN</h4>
                <div className="overflow-x-auto">
                    <table className="table table-bordered table-sm w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>Sl. No.</th>
                                <th>Tax Deposited (Rs.)</th>
                                <th>BSR Code</th>
                                <th>Date of Deposit</th>
                                <th>Challan Serial No.</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td>0.00</td><td>-</td><td>07-10-2022</td><td>-</td><td>F</td></tr>
                            <tr><td>2</td><td>100.00</td><td>0014431</td><td>07-10-2022</td><td>04626</td><td>F</td></tr>
                            <tr><td>3</td><td>0.00</td><td>-</td><td>07-10-2022</td><td>-</td><td>F</td></tr>
                            <tr className="font-bold bg-base-200">
                                <td>Total (Rs.)</td>
                                <td>100.00</td>
                                <td colSpan="4"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 pt-4 border-t">
                    <h4 className="font-bold">Verification</h4>
                    <p className="text-xs mt-2">
                        I, SRIKANT, son / daughter of SRINIVASAN working in the capacity of DIRECTOR (designation) do hereby certify that a sum of Rs. 100.00 [Rs. One Hundred Only (in words)] has been deducted and a sum of Rs. 100.00 [Rs. One Hundred Only] has been deposited to the credit of the Central Government. I further certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, TDS deposited and other available records.
                    </p>
                    <div className="flex justify-between mt-4">
                        <div><strong>Place:</strong> CHENNAI</div>
                        <div><strong>Date:</strong> 23-Jan-2023</div>
                        <div><strong>Full Name:</strong> SRIKANT</div>
                        <div><strong>Designation:</strong> DIRECTOR</div>
                    </div>
                </div>
            </div>

            <div className="form-control mt-4 p-4 bg-base-200 rounded-lg">
                <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" className="checkbox checkbox-primary" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="label-text font-medium">I have verified all details in Part A and confirm they are correct.</span>
                </label>
            </div>
        </div>
    );
};

export default Step1_VerifyPartA;
