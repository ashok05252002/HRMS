import React from 'react';

const Step1_SetParameters = () => {
    return (
        <form className="space-y-8">
            {/* Particulars of Return */}
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Particulars of Return</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Type of Deductor</span></label>
                        <select className="select select-bordered"><option>Non-Government</option><option>Government</option></select>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Payment Section Code</span></label>
                        <select className="select select-bordered"><option>192 - Salary</option></select>
                    </div>
                </div>
            </div>

            {/* Particulars of Deductor */}
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Particulars of Deductor (Employer)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control"><label className="label"><span className="label-text">PAN</span></label><input type="text" placeholder="ABCDE1234F" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">TAN</span></label><input type="text" placeholder="ABCD12345E" className="input input-bordered" /></div>
                    <div className="form-control md:col-span-2"><label className="label"><span className="label-text">Name</span></label><input type="text" placeholder="Pro-People Inc." className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Flat/Door/Block No.</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Name of Premises/Building</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Road/Street/Lane</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Area/Locality</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Town/City/District</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">State</span></label><input type="text" placeholder="State" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">PIN Code</span></label><input type="text" placeholder="PIN Code" className="input input-bordered" /></div>
                </div>
            </div>

            {/* Person Responsible */}
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Person Responsible for Deduction of Tax</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control"><label className="label"><span className="label-text">Name</span></label><input type="text" placeholder="Responsible Person Name" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Designation</span></label><input type="text" placeholder="Designation" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Mobile Number</span></label><input type="text" placeholder="Mobile Number" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Email</span></label><input type="email" placeholder="Email Address" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Flat/Door/Block No.</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Name of Premises/Building</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Road/Street/Lane</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Area/Locality</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Town/City/District</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">State</span></label><input type="text" placeholder="State" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">PIN Code</span></label><input type="text" placeholder="PIN Code" className="input input-bordered" /></div>
                </div>
            </div>
            
            {/* Preferences */}
            <div className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Include Zero TDS Records</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Consolidated Challan Mode</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Auto-allocate Challans</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Suppress Zero Gross Income Records</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Suppress Zero IT in Annexure I</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Suppress Address in Annexure II</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Exclude Employees without PAN and Zero IT in eTDS</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Split Annexure I into multiple sheets</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Include Zero IT Records in eTDS</span></label></div>
                </div>
                <div className="divider">Files to Generate</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Generate Form 24Q</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Generate Form 24Q Annexure I</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Generate Form 24Q Annexure II</span></label></div>
                    <div className="form-control"><label className="label cursor-pointer justify-start gap-4"><input type="checkbox" className="checkbox checkbox-sm" /><span>Generate Form 27A</span></label></div>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="btn btn-secondary">Save Settings</button>
            </div>
        </form>
    );
};

export default Step1_SetParameters;
