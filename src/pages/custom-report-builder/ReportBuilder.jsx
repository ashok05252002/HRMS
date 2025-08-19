import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Filter, List, FilePlus2 } from 'lucide-react';

const fieldCategories = {
  'Basic Information': ['Employee ID', 'Full Name', 'Email', 'Contact Number', 'Gender', 'Date of Birth', 'Date of Joining', 'Department', 'Designation', 'Employee Type', 'Employment Status'],
  'Attendance & Time': ['Check-in Time', 'Check-out Time', 'Total Hours Worked', 'Overtime Hours', 'Working Days', 'Absent Days', 'Late Marked Entries', 'Shift Type'],
  'Leave & Permission': ['Leave Type', 'Leave Status', 'Number of Leave Days', 'Leave Start Date', 'Leave End Date', 'Permission Type', 'Permission Hours', 'Leave Balance'],
  'Payroll': ['Basic Salary', 'Allowances', 'Deductions', 'Net Pay', 'Bonus', 'Reimbursement', 'ESI/PF Deduction', 'TDS Deducted'],
  'Performance': ['Last Appraisal Date', 'Appraisal Rating', 'Promotion Status', 'Skill Rating', 'Goal Status'],
  'Training': ['Training Name', 'Training Status', 'Training Completion Date', 'Trainer', 'Feedback Score'],
  'Documents & Compliance': ['Aadhar/PAN Uploaded', 'Bank Account Status', 'Compliance Form Status', 'Contract Expiry Date'],
  'Exit Information': ['Resignation Date', 'Notice Period', 'Last Working Day', 'Exit Interview Status', 'Clearance Status'],
};

const ReportBuilder = () => {
  const [reportName, setReportName] = useState('');
  const [selectedFields, setSelectedFields] = useState(new Set());
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    department: 'All',
    employeeType: 'All',
  });
  const navigate = useNavigate();

  const handleFieldChange = (field) => {
    setSelectedFields(prev => {
      const newSet = new Set(prev);
      if (newSet.has(field)) {
        newSet.delete(field);
      } else {
        newSet.add(field);
      }
      return newSet;
    });
  };
  
  const handleSelectAllCategory = (category, isChecked) => {
    const fieldsInCategory = fieldCategories[category];
    setSelectedFields(prev => {
        const newSet = new Set(prev);
        if (isChecked) {
            fieldsInCategory.forEach(field => newSet.add(field));
        } else {
            fieldsInCategory.forEach(field => newSet.delete(field));
        }
        return newSet;
    });
  };

  const handlePreview = () => {
    if (!reportName || selectedFields.size === 0) {
      alert('Please provide a report name and select at least one data field.');
      return;
    }
    navigate('/custom-report-builder/preview', {
      state: { reportName, selectedFields: Array.from(selectedFields), filters }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FilePlus2 size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Create New Custom Report</h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="form-control w-full max-w-lg">
            <label className="label"><span className="label-text font-semibold text-lg">Report Name</span></label>
            <input
              type="text"
              placeholder="e.g., Monthly Attendance Summary"
              className="input input-bordered"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <List size={20} className="text-secondary" />
            <h2 className="card-title">Select Data Fields</h2>
          </div>
          <div className="space-y-2">
            {Object.entries(fieldCategories).map(([category, fields]) => {
              const allInCategorySelected = fields.every(field => selectedFields.has(field));
              return (
                <div key={category} className="collapse collapse-arrow bg-base-200">
                  <input type="checkbox" />
                  <div className="collapse-title text-md font-medium flex justify-between items-center">
                    {category}
                    <div className="form-control" onClick={(e) => e.stopPropagation()}>
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text text-xs">Select All</span> 
                            <input type="checkbox" className="checkbox checkbox-sm" checked={allInCategorySelected} onChange={(e) => handleSelectAllCategory(category, e.target.checked)} />
                        </label>
                    </div>
                  </div>
                  <div className="collapse-content">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
                      {fields.map(field => (
                        <div key={field} className="form-control">
                          <label className="label cursor-pointer justify-start gap-2">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary checkbox-sm"
                              checked={selectedFields.has(field)}
                              onChange={() => handleFieldChange(field)}
                            />
                            <span className="label-text text-sm">{field}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <Filter size={20} className="text-accent" />
            <h2 className="card-title">Add Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Date Range</span></label>
              <div className="flex gap-2">
                <input type="date" className="input input-bordered input-sm w-full" />
                <input type="date" className="input input-bordered input-sm w-full" />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Department</span></label>
              <select className="select select-bordered select-sm"><option>All</option><option>IT</option><option>Sales</option></select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Employee Type</span></label>
              <select className="select select-bordered select-sm"><option>All</option><option>Full-time</option><option>Part-time</option></select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handlePreview} className="btn btn-primary btn-lg">
          <Eye size={20} />
          Preview Report
        </button>
      </div>
    </div>
  );
};

export default ReportBuilder;
