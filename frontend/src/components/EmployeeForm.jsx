import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';

const EmployeeForm = ({ employee, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        role: '',
        email: '',
        phone: '',
        age: '',
        dateOfJoining: '',
        salary: ''
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);

        try {
            if (employee) {
                await employeeAPI.update(employee.id, formData);
            } else {
                await employeeAPI.create(formData);
            }
            onSuccess();
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors([error.response?.data?.error || 'An error occurred']);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
                <div className="alert alert-error">
                    <div>
                        <strong>Validation Errors:</strong>
                        <ul style={{ marginTop: 'var(--spacing-sm)', marginLeft: 'var(--spacing-lg)' }}>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label required">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@company.com"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label required">Department</label>
                    <select
                        name="department"
                        className="form-select"
                        value={formData.department}
                        onChange={handleChange}
                    >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label required">Role</label>
                    <input
                        type="text"
                        name="role"
                        className="form-input"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label required">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1-555-0123"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">Age</label>
                    <input
                        type="number"
                        name="age"
                        className="form-input"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="30"
                        min="18"
                        max="100"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label required">Date of Joining</label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        className="form-input"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        className="form-input"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="75000"
                        min="0"
                        step="1000"
                    />
                </div>
            </div>

            <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;
