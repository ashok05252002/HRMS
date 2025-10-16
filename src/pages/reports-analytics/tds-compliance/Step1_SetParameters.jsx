import React from 'react';

const Step1_SetParameters = ({ onComplete }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Step 1: Set Form 24Q Parameters</h3>
      <form className="space-y-4">
        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title font-medium">Particulars of Return</div>
            <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Type of Deductor</span></label>
                        <select className="select select-bordered"><option>Non-Government</option><option>Government</option></select>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Payment Section Code</span></label>
                        <select className="select select-bordered"><option>192 - Salaries</option></select>
                    </div>
                </div>
            </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title font-medium">Particulars of Deductor (Employer)</div>
            <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="form-control"><label className="label"><span className="label-text">PAN</span></label><input type="text" defaultValue="ABCDE1234F" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">TAN</span></label><input type="text" defaultValue="ABCD12345E" className="input input-bordered" /></div>
                    <div className="form-control md:col-span-2"><label className="label"><span className="label-text">Name</span></label><input type="text" defaultValue="HRMS Solutions Pvt. Ltd." className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Flat/Door/Block No.</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Premises/Building/Village</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Road/Street/Lane</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Area/Locality</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Town/City/District</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">State</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">PIN Code</span></label><input type="text" className="input input-bordered" /></div>
                </div>
            </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title font-medium">Person Responsible for Deduction of Tax</div>
            <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="form-control"><label className="label"><span className="label-text">Name</span></label><input type="text" defaultValue="Mr. Anand Kumar" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Designation</span></label><input type="text" defaultValue="Finance Director" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Mobile Number</span></label><input type="text" defaultValue="9876543210" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Email</span></label><input type="text" defaultValue="anand.k@hrms.com" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Flat/Door/Block No.</span></label><input type="text" className="input input-bordered" /></div>
                    <div className="form-control"><label className="label"><span className="label-text">Premises/Building/Village</span></label><input type="text" className="input input-bordered" /></div>
                </div>
            </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title font-medium">Preferences</div>
            <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                    <label className="label cursor-pointer"><span className="label-text">Include zero TDS records</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Consolidated Challan mode</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Auto-allocate challans</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Suppress zero gross income</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Suppress zero IT Annexure I</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Suppress Address Annexure II</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Exclude employees without PAN and zero IT</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Split Annexure I into multiple sheets</span><input type="checkbox" className="checkbox" /></label>
                    <label className="label cursor-pointer"><span className="label-text">Generate Form 24Q</span><input type="checkbox" className="checkbox" defaultChecked /></label>
                    <label className="label cursor-pointer"><span className="label-text">Generate Form 24Q Annexure I</span><input type="checkbox" className="checkbox" defaultChecked /></label>
                    <label className="label cursor-pointer"><span className="label-text">Generate Form 24Q Annexure II</span><input type="checkbox" className="checkbox" defaultChecked /></label>
                    <label className="label cursor-pointer"><span className="label-text">Generate Form 27A</span><input type="checkbox" className="checkbox" defaultChecked /></label>
                </div>
            </div>
        </div>
      </form>
      <div className="flex justify-end">
        <button onClick={onComplete} className="btn btn-primary">Save & Continue</button>
      </div>
    </div>
  );
};

export default Step1_SetParameters;
