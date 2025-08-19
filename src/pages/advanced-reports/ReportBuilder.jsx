import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, Filter, List, FilePlus2, Plus, Trash2 } from 'lucide-react';

const fieldCategories = {
  'Basic Information': ['Employee ID', 'Full Name', 'Email', 'Contact Number', 'Gender', 'Date of Birth', 'Date of Joining', 'Department', 'Designation', 'Employee Type', 'Employment Status'],
  'Attendance & Time': ['Check-in Time', 'Check-out Time', 'Total Hours Worked', 'Overtime Hours', 'Working Days', 'Absent Days', 'Late Marked Entries', 'Shift Type'],
  'Leave & Permission': ['Leave Type', 'Leave Status', 'Number of Leave Days', 'Leave Start Date', 'Leave End Date', 'Permission Type', 'Permission Hours', 'Leave Balance'],
  'Payroll': ['Basic Salary', 'Allowances', 'Deductions', 'Net Pay', 'Bonus', 'Reimbursement', 'ESI/PF Deduction', 'TDS Deducted'],
};

const filterableFieldsConfig = {
    'Department': { type: 'multiselect', options: ['IT', 'Sales', 'Marketing', 'HR', 'Design'] },
    'Designation': { type: 'multiselect', options: ['Software Engineer', 'Sr. Developer', 'Manager', 'Designer', 'HR Executive'] },
    'Gender': { type: 'select', options: ['Male', 'Female', 'Other'] },
    'Employee Type': { type: 'multiselect', options: ['Full-time', 'Part-time', 'Contract', 'Intern'] },
    'Employment Status': { type: 'multiselect', options: ['Active', 'On Leave', 'Terminated'] },
    'Leave Status': { type: 'multiselect', options: ['Approved', 'Pending', 'Rejected'] },
    'Date of Joining': { type: 'daterange' },
    'Salary Range': { type: 'numberrange', currency: 'OMR' },
};

const ReportBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditing, ...reportData } = location.state || {};

  const [reportName, setReportName] = useState('');
  const [selectedFields, setSelectedFields] = useState(new Set());
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (isEditing) {
      setReportName(reportData.name);
      setSelectedFields(new Set(reportData.fields));
      setFilters(reportData.filters || []);
    }
  }, [isEditing, reportData]);

  const handleFieldChange = (field) => {
    setSelectedFields(prev => {
      const newSet = new Set(prev);
      newSet.has(field) ? newSet.delete(field) : newSet.add(field);
      return newSet;
    });
  };

  const handleSelectAllCategory = (category, isChecked) => {
    setSelectedFields(prev => {
        const newSet = new Set(prev);
        fieldCategories[category].forEach(field => isChecked ? newSet.add(field) : newSet.delete(field));
        return newSet;
    });
  };
  
  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), field: '', value: null }]);
  };

  const updateFilter = (id, key, value) => {
    setFilters(filters.map(f => f.id === id ? { ...f, [key]: value, ...(key === 'field' && {value: null}) } : f));
  };
  
  const removeFilter = (id) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const handlePreview = () => {
    if (!reportName || selectedFields.size === 0) {
      alert('Please provide a report name and select at least one data field.');
      return;
    }
    navigate('/advanced-reports/preview', {
      state: { reportName, selectedFields: Array.from(selectedFields), filters }
    });
  };

  const renderFilterInput = (filter) => {
    const config = filterableFieldsConfig[filter.field];
    if (!config) return null;

    switch (config.type) {
        case 'multiselect':
            return (
                <select multiple className="select select-bordered select-sm w-full" value={filter.value || []} onChange={(e) => updateFilter(filter.id, 'value', Array.from(e.target.selectedOptions, option => option.value))}>
                    {config.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        case 'select':
             return (
                <select className="select select-bordered select-sm w-full" value={filter.value || ''} onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}>
                    <option value="">Select...</option>
                    {config.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        case 'daterange':
            return (
                <div className="flex gap-2">
                    <input type="date" className="input input-bordered input-sm w-full" value={filter.value?.start || ''} onChange={e => updateFilter(filter.id, 'value', {...filter.value, start: e.target.value})} />
                    <input type="date" className="input input-bordered input-sm w-full" value={filter.value?.end || ''} onChange={e => updateFilter(filter.id, 'value', {...filter.value, end: e.target.value})} />
                </div>
            );
        case 'numberrange':
            return (
                <div className="flex gap-2 items-center">
                    <input type="number" placeholder="Min" className="input input-bordered input-sm w-full" value={filter.value?.min || ''} onChange={e => updateFilter(filter.id, 'value', {...filter.value, min: e.target.value})} />
                    <span>-</span>
                    <input type="number" placeholder="Max" className="input input-bordered input-sm w-full" value={filter.value?.max || ''} onChange={e => updateFilter(filter.id, 'value', {...filter.value, max: e.target.value})} />
                </div>
            );
        default:
            return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FilePlus2 size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Custom Report' : 'Create New Custom Report'}</h1>
      </div>

      <div className="card bg-base-100 shadow-xl p-6 space-y-4">
        <div className="form-control w-full max-w-lg">
          <label className="label"><span className="label-text font-semibold text-lg">Report Name</span></label>
          <input type="text" placeholder="e.g., Monthly Attendance Summary" className="input input-bordered" value={reportName} onChange={(e) => setReportName(e.target.value)} />
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl p-6 space-y-4">
        <h2 className="card-title">Select Data Fields</h2>
        {Object.entries(fieldCategories).map(([category, fields]) => (
          <div key={category} className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium flex justify-between items-center">
              {category}
              <label className="label cursor-pointer gap-2" onClick={e => e.stopPropagation()}>
                <span className="label-text text-xs">Select All</span> 
                <input type="checkbox" className="checkbox checkbox-sm" checked={fields.every(f => selectedFields.has(f))} onChange={(e) => handleSelectAllCategory(category, e.target.checked)} />
              </label>
            </div>
            <div className="collapse-content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {fields.map(field => (
                <label key={field} className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={selectedFields.has(field)} onChange={() => handleFieldChange(field)} />
                  <span className="label-text text-sm">{field}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="card bg-base-100 shadow-xl p-6 space-y-4">
        <h2 className="card-title">Add Filters</h2>
        <div className="space-y-3">
            {filters.map(filter => (
                <div key={filter.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center p-2 border rounded-lg">
                    <select className="select select-bordered select-sm" value={filter.field} onChange={(e) => updateFilter(filter.id, 'field', e.target.value)}>
                        <option value="">Select Field...</option>
                        {Object.keys(filterableFieldsConfig).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    <div className="md:col-span-1">{renderFilterInput(filter)}</div>
                    <button onClick={() => removeFilter(filter.id)} className="btn btn-ghost btn-sm btn-circle justify-self-end"><Trash2 size={16} className="text-error"/></button>
                </div>
            ))}
        </div>
        <button onClick={addFilter} className="btn btn-outline btn-sm self-start"><Plus size={16} /> Add Filter</button>
      </div>

      <div className="flex justify-end">
        <button onClick={handlePreview} className="btn btn-primary btn-lg"><Eye size={20} /> Preview Report</button>
      </div>
    </div>
  );
};

export default ReportBuilder;
