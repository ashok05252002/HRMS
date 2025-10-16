import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateEmployees = (count) => {
  const employees = [];
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    employees.push({
      id: `PR${102 + i}`,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      department: faker.commerce.department(),
      designation: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'On Leave']),
      avatar: faker.image.avatar(),
    });
  }
  // Add one specific employee for consistency
  const specificEmployee = {
      id: 'PR101',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9876543210',
      department: 'Engineering',
      designation: 'Sr. Software Engineer',
      status: 'Active',
      avatar: faker.image.avatar(),
  };
  return [specificEmployee, ...employees];
};


const EmployeeList = () => {
  const [employees] = useState(() => generateEmployees(15));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button className="btn btn-primary">
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="form-control flex-grow">
              <div className="input-group">
                <span><Search size={20} /></span>
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="form-control">
              <select
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Contact</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={employee.avatar} alt={employee.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{employee.name}</div>
                          <div className="text-sm opacity-50">{employee.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td>{employee.id}</td>
                    <td>
                      {employee.email}
                      <br/>
                      <span className="badge badge-ghost badge-sm">{employee.phone}</span>
                    </td>
                    <td>{employee.department}</td>
                    <td>
                      <span className={`badge ${
                        employee.status === 'Active' ? 'badge-success' :
                        employee.status === 'On Leave' ? 'badge-warning' : 'badge-error'
                      }`}>{employee.status}</span>
                    </td>
                    <th>
                      <Link to={`/employees/${employee.id}`} className="btn btn-ghost btn-xs">
                        details
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
