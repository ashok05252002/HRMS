import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, List, FilePlus2, Filter, GripVertical, CalendarClock, Save } from 'lucide-react';

const fieldCategories = {
  'Basic Information': ['Employee ID', 'Full Name', 'Email', 'Contact Number', 'Gender', 'Date of Birth', 'Date of Joining', 'Department', 'Designation / Job Title', 'Employee Type', 'Employment Status'],
  'Attendance & Time': ['Check-in Time', 'Check-out Time', 'Total Hours Worked', 'Overtime Hours', 'Working Days', 'Absent Days', 'Late Marked Entries', 'Shift Type / Name'],
  'Leave & Permission': ['Leave Type', 'Leave Status', 'Number of Leave Days', 'Leave Start Date', 'Leave End Date', 'Permission Type', 'Permission Hours', 'Leave Balance'],
  'Payroll': [
    'Annual CTC', 'Monthly CTC', 'Monthly Fixed Gross', 'Total No Days', 'LOP Days', 'No of Days Paid', 'Earned Gross', 'Basic', 'HRA', 'PF Gross', 'Bonus', 'Special Allowance', 'Employee PF', 'Employee ESIC', 'TDS', 'PT', 'Tot.Deduction', 'Net Salary', 'Variable Pay', 'Salary Release', 'Salary Hold', 'Advance Recovered', 'Actual Payout', 'Emplr PF', 'Emplr ESI'
  ],
};

const fieldToFilterConfig = {
    'Employee ID': { type: 'text', placeholder: 'Enter partial or full ID...' },
    'Full Name': { type: 'text', placeholder: 'Enter partial or full name...' },
    'Email': { type: 'text', placeholder: 'Enter partial or full email...' },
    'Contact Number': { type: 'text', placeholder: 'Enter contact number...' },
    'Gender': { type: 'select', options: ['All', 'Male', 'Female', 'Other'] },
    'Date of Birth': { type: 'daterange' },
    'Date of Joining': { type: 'daterange' },
    'Department': { type: 'multiselect', options: ['IT', 'Sales', 'Marketing', 'HR', 'Design', 'Finance'] },
    'Designation / Job Title': { type: 'multiselect', options: ['Software Engineer', 'Sr. Developer', 'Team Lead', 'Manager', 'Designer', 'HR Executive'] },
    'Employee Type': { type: 'select', options: ['All', 'Permanent', 'Intern', 'Contract'] },
    'Employment Status': { type: 'select', options: ['All', 'Active', 'Inactive', 'On Notice', 'Suspended'] },
    'Check-in Time': { type: 'timerange' },
    'Check-out Time': { type: 'timerange' },
    'Total Hours Worked': { type: 'numberrange', placeholderMin: 'Min Hours', placeholderMax: 'Max Hours' },
    'Overtime Hours': { type: 'numberrange', placeholderMin: 'Min Hours', placeholderMax: 'Max Hours' },
    'Working Days': { type: 'numberrange', placeholderMin: 'Min Days', placeholderMax: 'Max Days' },
    'Absent Days': { type: 'numberrange', placeholderMin: 'Min Days', placeholderMax: 'Max Days' },
    'Late Marked Entries': { type: 'numberrange', placeholderMin: 'Min Entries', placeholderMax: 'Max Entries' },
    'Shift Type / Name': { type: 'multiselect', options: ['General Shift', 'Night Shift', 'Morning Shift', 'Evening Shift'] },
    'Leave Type': { type: 'multiselect', options: ['Casual', 'Sick', 'Earned', 'Maternity', 'Paternity'] },
    'Leave Status': { type: 'select', options: ['All', 'Approved', 'Rejected', 'Pending'] },
    'Number of Leave Days': { type: 'numberrange', placeholderMin: 'Min Days', placeholderMax: 'Max Days' },
    'Leave Start Date': { type: 'daterange' },
    'Leave End Date': { type: 'daterange' },
    'Permission Type': { type: 'select', options: ['All', 'In-Time', 'Out-Time'] },
    'Permission Hours': { type: 'numberrange', placeholderMin: 'Min Hours', placeholderMax: 'Max Hours' },
    'Leave Balance': { type: 'numberrange', placeholderMin: 'Min Days', placeholderMax: 'Max Days' },
    'Annual CTC': { type: 'numberrange', currency: 'INR' },
    'Monthly CTC': { type: 'numberrange', currency: 'INR' },
    'Monthly Fixed Gross': { type: 'numberrange', currency: 'INR' },
    'Earned Gross': { type: 'numberrange', currency: 'INR' },
    'Basic': { type: 'numberrange', currency: 'INR' },
    'HRA': { type: 'numberrange', currency: 'INR' },
    'PF Gross': { type: 'numberrange', currency: 'INR' },
    'Bonus': { type: 'numberrange', currency: 'INR' },
    'Special Allowance': { type: 'numberrange', currency: 'INR' },
    'Employee PF': { type: 'numberrange', currency: 'INR' },
    'Employee ESIC': { type: 'numberrange', currency: 'INR' },
    'TDS': { type: 'numberrange', currency: 'INR' },
    'PT': { type: 'numberrange', currency: 'INR' },
    'Tot.Deduction': { type: 'numberrange', currency: 'INR' },
    'Net Salary': { type: 'numberrange', currency: 'INR' },
    'Variable Pay': { type: 'numberrange', currency: 'INR' },
    'Salary Release': { type: 'numberrange', currency: 'INR' },
    'Salary Hold': { type: 'numberrange', currency: 'INR' },
    'Advance Recovered': { type: 'numberrange', currency: 'INR' },
    'Actual Payout': { type: 'numberrange', currency: 'INR' },
    'Emplr PF': { type: 'numberrange', currency: 'INR' },
    'Emplr ESI': { type: 'numberrange', currency: 'INR' },
};

const CreateReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditing, ...reportData } = location.state || {};

  const [reportName, setReportName] = useState('');
  const [orderedFields, setOrderedFields] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [reportDateRange, setReportDateRange] = useState({ start: '', end: '' });
  
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleOptions, setScheduleOptions] = useState({ frequency: 'Daily', day: '', time: '09:00' });
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setReportName(reportData.name);
      setOrderedFields(reportData.fields || []);
      setFilterValues(reportData.filters || {});
      setReportDateRange(reportData.reportDateRange || { start: '', end: '' });
    }
  }, [isEditing, reportData]);

  const handleFieldChange = (field) => {
    setOrderedFields(prev => {
        if (prev.includes(field)) {
            setFilterValues(currentFilters => {
                const newFilters = { ...currentFilters };
                delete newFilters[field];
                return newFilters;
            });
            return prev.filter(f => f !== field);
        } else {
            return [...prev, field];
        }
    });
  };
  
  const handleFilterChange = (field, value) => {
    setFilterValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSort = () => {
    let _orderedFields = [...orderedFields];
    const draggedItemContent = _orderedFields.splice(dragItem.current, 1)[0];
    _orderedFields.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setOrderedFields(_orderedFields);
  };

  const handlePreview = () => {
    if (!reportName || orderedFields.length === 0) {
      alert('Please provide a report name and select at least one data field.');
      return;
    }
    navigate('/reports-analytics/builder/preview', {
      state: { reportName, selectedFields: orderedFields, filters: filterValues, reportDateRange }
    });
  };

  const handleSaveAsTemplate = () => {
    if (!reportName) {
        alert('Please provide a report name before saving as a template.');
        return;
    }
    setShowSaveTemplateModal(true);
  };

  const confirmSaveTemplate = () => {
    console.log("Saving template:", { reportName, orderedFields, filterValues });
    alert(`Template "${reportName}" has been saved!`);
    setShowSaveTemplateModal(false);
  };
  
  const renderFilterInput = (field) => {
    const config = fieldToFilterConfig[field];
    if (!config) return null;
    
    const value = filterValues[field];

    switch (config.type) {
        case 'text':
            return <input type="text" placeholder={config.placeholder} className="input input-bordered input-sm w-full" value={value || ''} onChange={e => handleFilterChange(field, e.target.value)} />;
        case 'select':
            return <select className="select select-bordered select-sm w-full" value={value || 'All'} onChange={e => handleFilterChange(field, e.target.value)}>{config.options.map(opt => <option key={opt}>{opt}</option>)}</select>;
        case 'multiselect':
            return <select multiple className="select select-bordered select-sm w-full h-24" value={value || []} onChange={e => handleFilterChange(field, Array.from(e.target.selectedOptions, option => option.value))}>{config.options.map(opt => <option key={opt}>{opt}</option>)}</select>;
        case 'daterange':
            return <div className="flex gap-2"><input type="date" className="input input-bordered input-sm w-full" value={value?.start || ''} onChange={e => handleFilterChange(field, {...value, start: e.target.value})} /><input type="date" className="input input-bordered input-sm w-full" value={value?.end || ''} onChange={e => handleFilterChange(field, {...value, end: e.target.value})} /></div>;
        case 'timerange':
            return <div className="flex gap-2"><input type="time" className="input input-bordered input-sm w-full" value={value?.start || ''} onChange={e => handleFilterChange(field, {...value, start: e.target.value})} /><input type="time" className="input input-bordered input-sm w-full" value={value?.end || ''} onChange={e => handleFilterChange(field, {...value, end: e.target.value})} /></div>;
        case 'numberrange':
            return <div className="flex gap-2 items-center"><input type="number" placeholder={config.placeholderMin || 'Min'} className="input input-bordered input-sm w-full" value={value?.min || ''} onChange={e => handleFilterChange(field, {...value, min: e.target.value})} /><span>-</span><input type="number" placeholder={config.placeholderMax || 'Max'} className="input input-bordered input-sm w-full" value={value?.max || ''} onChange={e => handleFilterChange(field, {...value, max: e.target.value})} /></div>;
        default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FilePlus2 size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Custom Report' : 'Create New Custom Report'}</h1>
      </div>

      <div className="card bg-base-100 shadow-xl p-6">
        <label className="label"><span className="label-text font-semibold text-lg">Report Name</span></label>
        <input type="text" placeholder="e.g., Monthly Attendance Summary" className="input input-bordered w-full max-w-lg" value={reportName} onChange={(e) => setReportName(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card bg-base-100 shadow-xl p-6 space-y-4">
          <div className="flex items-center gap-3"><List size={20} className="text-secondary" /><h2 className="card-title">Select Data Fields</h2></div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
            {Object.entries(fieldCategories).map(([category, fields]) => (
              <div key={category} className="collapse collapse-arrow bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-md font-medium">{category}</div>
                <div className="collapse-content grid grid-cols-1 gap-y-1 p-2">
                  {fields.map(field => (
                    <label key={field} className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={orderedFields.includes(field)} onChange={() => handleFieldChange(field)} />
                      <span className="label-text text-sm">{field}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card bg-base-100 shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3"><Filter size={20} className="text-accent" /><h2 className="card-title">Configure Filters & Columns</h2></div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-semibold">Arrange Columns</h3>
                    {orderedFields.length > 0 ? (
                        <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[8rem]">
                            {orderedFields.map((field, index) => (
                                <div 
                                    key={field} 
                                    className="flex items-center p-2 bg-base-200 rounded-lg cursor-grab shadow-sm hover:bg-base-300 transition-colors"
                                    draggable
                                    onDragStart={(e) => (dragItem.current = index)}
                                    onDragEnter={(e) => (dragOverItem.current = index)}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <GripVertical size={18} className="text-base-content/50 mr-2" />
                                    <span className="label-text text-sm font-medium">{field}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-base-content/60 border border-dashed rounded-lg">
                            <p>Select fields to arrange them here.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Configure Filters</h3>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Report Date Range</span></label>
                        <div className="flex gap-2">
                            <input type="date" className="input input-bordered input-sm w-full" value={reportDateRange.start} onChange={e => setReportDateRange({...reportDateRange, start: e.target.value})} />
                            <input type="date" className="input input-bordered input-sm w-full" value={reportDateRange.end} onChange={e => setReportDateRange({...reportDateRange, end: e.target.value})} />
                        </div>
                    </div>
                    <div className="divider text-xs">Field Specific Filters</div>
                    {orderedFields.length > 0 ? (
                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        {orderedFields.filter(field => fieldToFilterConfig[field]).map(field => (
                            <div key={field} className="form-control">
                            <label className="label"><span className="label-text">{field}</span></label>
                            {renderFilterInput(field)}
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-base-content/60 border border-dashed rounded-lg">
                            <p>Select fields to add filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl p-6">
        <div className="flex items-center gap-3"><CalendarClock size={20} className="text-info" /><h2 className="card-title">Schedule Report Generation</h2></div>
        <div className="form-control w-fit">
            <label className="label cursor-pointer">
                <span className="label-text mr-4">Enable Automated Report Generation</span> 
                <input type="checkbox" className="toggle toggle-primary" checked={scheduleEnabled} onChange={(e) => setScheduleEnabled(e.target.checked)} />
            </label>
        </div>
        {scheduleEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="form-control">
                    <label className="label"><span className="label-text">Frequency</span></label>
                    <select className="select select-bordered" value={scheduleOptions.frequency} onChange={e => setScheduleOptions({...scheduleOptions, frequency: e.target.value})}>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Day</span></label>
                    {scheduleOptions.frequency === 'Weekly' && (
                        <select className="select select-bordered" value={scheduleOptions.day} onChange={e => setScheduleOptions({...scheduleOptions, day: e.target.value})}>
                            <option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
                        </select>
                    )}
                    {scheduleOptions.frequency === 'Monthly' && (
                        <input type="number" min="1" max="31" placeholder="Day of month" className="input input-bordered" value={scheduleOptions.day} onChange={e => setScheduleOptions({...scheduleOptions, day: e.target.value})} />
                    )}
                    {scheduleOptions.frequency === 'Daily' && (
                        <input type="text" className="input input-bordered" value="Every Day" disabled />
                    )}
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Time</span></label>
                    <input type="time" className="input input-bordered" value={scheduleOptions.time} onChange={e => setScheduleOptions({...scheduleOptions, time: e.target.value})} />
                </div>
            </div>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button onClick={handleSaveAsTemplate} className="btn btn-secondary">
          <Save size={20} />
          Save as Template
        </button>
        <button onClick={handlePreview} className="btn btn-primary btn-lg">
          <Eye size={20} /> Preview Report
        </button>
      </div>

      {showSaveTemplateModal && (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Save Template</h3>
                <p className="py-4">Are you sure you want to save the current configuration (fields, filters, and column order) as a new template named "{reportName}"?</p>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={() => setShowSaveTemplateModal(false)}>Cancel</button>
                    <button className="btn btn-secondary" onClick={confirmSaveTemplate}>Confirm & Save</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CreateReport;
