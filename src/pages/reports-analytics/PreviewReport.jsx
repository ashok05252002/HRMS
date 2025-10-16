import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Save, Download, FileText } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const generateDummyData = (fields, count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const row = {};
        fields.forEach(field => {
            switch (field) {
                case 'Employee ID': row[field] = `EMP${101 + i}`; break;
                case 'Full Name': row[field] = faker.person.fullName(); break;
                case 'Email': row[field] = faker.internet.email(); break;
                case 'Department': row[field] = faker.commerce.department(); break;
                case 'Basic Salary': row[field] = `INR ${faker.finance.amount(30000, 80000, 0)}`; break;
                case 'Net Pay': row[field] = `INR ${faker.finance.amount(25000, 70000, 0)}`; break;
                default: row[field] = 'N/A';
            }
        });
        data.push(row);
    }
    return data;
};

const DraggableHeader = ({ field, index, moveColumn }) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: 'HEADER',
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
        type: 'HEADER',
        item: { field, index },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });
    drag(drop(ref));
    return (
        <th ref={ref} className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}>
            {field}
        </th>
    );
};

const PreviewReport = () => {
    const initialFields = ['Employee ID', 'Full Name', 'Email', 'Department', 'Basic Salary', 'Net Pay'];
    const [columns, setColumns] = useState(initialFields);
    const dummyData = useMemo(() => generateDummyData(columns, 10), [columns]);

    const moveColumn = (dragIndex, hoverIndex) => {
        const draggedField = columns[dragIndex];
        const newFields = [...columns];
        newFields.splice(dragIndex, 1);
        newFields.splice(hoverIndex, 0, draggedField);
        setColumns(newFields);
    };

    return (
        <DndProvider backend={HTML5Backend}>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Report Preview: Active Employees</h1>
                    <p className="text-base-content/70">Drag and drop headers to reorder columns.</p>
                </div>
                <div className="flex gap-2">
                    <Link to="/reports-analytics/builder/create" className="btn btn-outline"><Edit size={16}/> Edit Report</Link>
                    <button className="btn btn-outline"><Save size={16}/> Save Report</button>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-primary"><Download size={16}/> Export Report</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li key="pdf"><a>Export as PDF</a></li>
                            <li key="excel"><a>Export as Excel</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    {columns.map((field, index) => (
                                        <DraggableHeader key={field} field={field} index={index} moveColumn={moveColumn} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map(col => <td key={col}>{row[col]}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </DndProvider>
    );
};

export default PreviewReport;
