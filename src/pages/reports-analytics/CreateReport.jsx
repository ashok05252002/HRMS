import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Calendar, Clock, Filter, Save, Play, Clock2 } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const fieldCategories = {
    "Basic Information": ["Employee ID", "Full Name", "Email", "Contact Number", "Gender", "Date of Birth", "Date of Joining", "Department", "Designation / Job Title", "Employee Type", "Employment Status"],
    "Attendance & Time": ["Check-in Time", "Check-out Time", "Total Hours Worked", "Overtime Hours", "Working Days", "Absent Days", "Late Marked Entries", "Shift Type / Name"],
    "Leave & Permission": ["Leave Type", "Leave Status", "Number of Leave Days", "Leave Start Date", "Leave End Date", "Permission Type", "Permission Hours", "Leave Balance"],
    "Payroll": ["Annual CTC", "Monthly CTC", "Monthly Fixed Gross", "Total No Days", "LOP Days", "No of Days Paid", "Earned Gross", "Basic", "HRA", "PF Gross", "Bonus", "Special Allowance", "Employee PF", "Employee ESIC", "TDS", "PT", "Tot.Deduction", "Net Salary", "Variable Pay", "Salary Release", "Salary Hold", "Advance Recovered", "Actual Payout", "Emplr PF", "Emplr ESI"]
};

const filterTypes = {
    "Employee ID": { type: 'text' }, "Full Name": { type: 'text' }, "Email": { type: 'text' }, "Contact Number": { type: 'text' },
    "Gender": { type: 'select', options: ["All", "Male", "Female", "Other"] },
    "Date of Birth": { type: 'date-range' }, "Date of Joining": { type: 'date-range' },
    "Department": { type: 'multi-select', options: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'] },
    "Designation / Job Title": { type: 'multi-select', options: ['Software Engineer', 'Sr. Designer', 'Marketing Lead', 'Sales Executive'] },
    "Employee Type": { type: 'select', options: ["All", "Permanent", "Intern", "Contract"] },
    "Employment Status": { type: 'select', options: ["All", "Active", "Inactive", "On Notice", "Suspended"] },
    "Check-in Time": { type: 'time-range' }, "Check-out Time": { type: 'time-range' },
    "Total Hours Worked": { type: 'number-range' }, "Overtime Hours": { type: 'number-range' }, "Working Days": { type: 'number-range' }, "Absent Days": { type: 'number-range' }, "Late Marked Entries": { type: 'number-range' },
    "Shift Type / Name": { type: 'multi-select', options: ['Morning', 'Evening', 'Night'] },
    "Leave Type": { type: 'multi-select', options: ['Casual', 'Sick', 'Earned', 'Maternity'] },
    "Leave Status": { type: 'select', options: ["All", "Approved", "Rejected", "Pending"] },
    "Number of Leave Days": { type: 'number-range' }, "Leave Start Date": { type: 'date-range' }, "Leave End Date": { type: 'date-range' },
    "Permission Type": { type: 'select', options: ["All", "In-Time", "Out-Time"] },
    "Permission Hours": { type: 'number-range' }, "Leave Balance": { type: 'number-range' },
    // Payroll filters
    "Annual CTC": { type: 'number-range' }, "Monthly CTC": { type: 'number-range' }, "Monthly Fixed Gross": { type: 'number-range' }, "Total No Days": { type: 'number-range' }, "LOP Days": { type: 'number-range' }, "No of Days Paid": { type: 'number-range' }, "Earned Gross": { type: 'number-range' }, "Basic": { type: 'number-range' }, "HRA": { type: 'number-range' }, "PF Gross": { type: 'number-range' }, "Bonus": { type: 'number-range' }, "Special Allowance": { type: 'number-range' }, "Employee PF": { type: 'number-range' }, "Employee ESIC": { type: 'number-range' }, "TDS": { type: 'number-range' }, "PT": { type: 'number-range' }, "Tot.Deduction": { type: 'number-range' }, "Net Salary": { type: 'number-range' }, "Variable Pay": { type: 'number-range' }, "Salary Release": { type: 'number-range' }, "Salary Hold": { type: 'number-range' }, "Advance Recovered": { type: 'number-range' }, "Actual Payout": { type: 'number-range' }, "Emplr PF": { type: 'number-range' }, "Emplr ESI": { type: 'number-range' },
};


const DraggableColumn = ({ field, index, moveColumn }) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: 'COLUMN',
        hover(item) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            moveColumn(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'COLUMN',
        item: { field, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    return (
        <div ref={ref} className={`badge badge-lg badge-outline cursor-move p-4 ${isDragging ? 'opacity-50' : ''}`}>
            {field}
        </div>
    );
};

const CreateReport = () => {
    const [reportName, setReportName] = useState('');
    const [openCategories, setOpenCategories] = useState({ "Basic Information": true });
    const [selectedFields, setSelectedFields] = useState([]);
    const [filters, setFilters] = useState({});
    const [showTemplateModal, setShowTemplateModal] = useState(false);

    const toggleCategory = (category) => {
        setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const handleFieldSelect = (field) => {
        setSelectedFields(prev =>
            prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
        );
    };

    const moveColumn = (dragIndex, hoverIndex) => {
        const draggedField = selectedFields[dragIndex];
        const newFields = [...selectedFields];
        newFields.splice(dragIndex, 1);
        newFields.splice(hoverIndex, 0, draggedField);
        setSelectedFields(newFields);
    };
    
    const renderFilterInput = (field) => {
        const filterConfig = filterTypes[field];
        if (!filterConfig) return null;

        switch (filterConfig.type) {
            case 'text': return <input type="text" placeholder={`Filter by ${field}`} className="input input-bordered input-sm w-full" />;
            case 'select': return <select className="select select-bordered select-sm w-full"><option disabled selected>Select {field}</option>{filterConfig.options.map(o => <option key={o}>{o}</option>)}</select>;
            case 'date-range': return <div className="flex gap-2"><input type="date" className="input input-bordered input-sm w-1/2" /><input type="date" className="input input-bordered input-sm w-1/2" /></div>;
            case 'time-range': return <div className="flex gap-2"><input type="time" className="input input-bordered input-sm w-1/2" /><input type="time" className="input input-bordered input-sm w-1/2" /></div>;
            case 'number-range': return <div className="flex gap-2"><input type="number" placeholder="Min" className="input input-bordered input-sm w-1/2" /><input type="number" placeholder="Max" className="input input-bordered input-sm w-1/2" /></div>;
            case 'multi-select': return <select className="select select-bordered select-sm w-full" multiple><option disabled>Select {field}</option>{filterConfig.options.map(o => <option key={o}>{o}</option>)}</select>;
            default: return null;
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Create New Custom Report</h1>
                <div className="flex gap-2">
                    <button className="btn btn-outline" onClick={() => setShowTemplateModal(true)}><Save size={16}/> Save as Template</button>
                    <Link to="/reports-analytics/builder/preview" className="btn btn-primary"><Play size={16}/> Preview Report</Link>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Report Name</span></label>
                        <input type="text" placeholder="Enter a name for your report" className="input input-bordered" value={reportName} onChange={e => setReportName(e.target.value)} />
                    </div>
                     <div className="form-control mt-4">
                        <label className="label"><span className="label-text font-semibold">Report Date Range</span></label>
                        <div className="flex gap-4">
                            <input type="date" className="input input-bordered w-full" />
                            <input type="date" className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title">Select Data Fields</h3>
                        <div className="space-y-2 h-96 overflow-y-auto">
                            {Object.entries(fieldCategories).map(([category, fields]) => (
                                <div key={category} className="collapse collapse-arrow bg-base-200">
                                    <input type="checkbox" checked={openCategories[category]} onChange={() => toggleCategory(category)} />
                                    <div className="collapse-title font-medium">{category}</div>
                                    <div className="collapse-content">
                                        {fields.map(field => (
                                            <div key={field} className="form-control">
                                                <label className="label cursor-pointer">
                                                    <span className="label-text">{field}</span>
                                                    <input type="checkbox" className="checkbox" checked={selectedFields.includes(field)} onChange={() => handleFieldSelect(field)} />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title">Configure Filters</h3>
                        <div className="space-y-4 h-96 overflow-y-auto">
                            {selectedFields.length > 0 ? selectedFields.map(field => (
                                <div key={field} className="form-control">
                                    <label className="label"><span className="label-text font-medium">{field}</span></label>
                                    {renderFilterInput(field)}
                                </div>
                            )) : <p className="text-base-content/60">Select fields to see available filters.</p>}
                        </div>
                    </div>
                </div>
            </div>
            
            {selectedFields.length > 0 && (
                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title">Arrange Columns</h3>
                        <p className="text-sm text-base-content/60">Drag and drop to reorder the columns for your report.</p>
                        <div className="p-4 bg-base-200 rounded-lg mt-4 flex flex-wrap gap-2">
                           {selectedFields.map((field, index) => (
                                <DraggableColumn key={field} field={field} index={index} moveColumn={moveColumn} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <h3 className="card-title">Schedule Report Generation</h3>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Enable Automated Report</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Frequency</span></label>
                            <select className="select select-bordered">
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Day</span></label>
                            <select className="select select-bordered"><option>Monday</option><option>1st of Month</option></select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Time</span></label>
                            <input type="time" className="input input-bordered" />
                        </div>
                    </div>
                </div>
            </div>

            {showTemplateModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Save Report Template</h3>
                        <p className="py-4">Are you sure you want to save the current fields, filters, and column order as a new template named "{reportName || 'Untitled Report'}"?</p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowTemplateModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => setShowTemplateModal(false)}>Confirm & Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </DndProvider>
    );
};

export default CreateReport;
