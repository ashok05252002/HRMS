import React from 'react';

const ProfileTab = ({ employee }) => {
    const profileDetails = [
        { label: 'Full Name', value: employee.name },
        { label: 'Email Address', value: employee.email },
        { label: 'Phone Number', value: employee.phone },
        { label: 'Joining Date', value: employee.joiningDate },
        { label: 'Location', value: employee.location },
        { label: 'Department', value: employee.department },
        { label: 'Designation', value: employee.designation },
        { label: 'Employee ID', value: employee.id },
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileDetails.map(detail => (
                    <div key={detail.label} className="form-control">
                        <label className="label">
                            <span className="label-text">{detail.label}</span>
                        </label>
                        <input type="text" value={detail.value} className="input input-bordered" readOnly />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileTab;
