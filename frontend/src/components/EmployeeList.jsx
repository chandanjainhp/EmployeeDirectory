import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import EmployeeForm from './EmployeeForm';
import { UsersIcon, PlusIcon, SearchIcon, MailboxIcon, TrashIcon } from './icons';

const EmployeeList = ({ onDataChange }) => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        // Filter employees based on search term
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);

    const fetchEmployees = async () => {
        try {
            const response = await employeeAPI.getAll();
            setEmployees(response.data.data);
            setFilteredEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sorted = [...filteredEmployees].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredEmployees(sorted);
    };

    const handleAdd = () => {
        setSelectedEmployee(null);
        setShowModal(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await employeeAPI.delete(id);
            await fetchEmployees();
            if (onDataChange) onDataChange();
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee');
        }
    };

    const handleFormSuccess = async () => {
        setShowModal(false);
        setSelectedEmployee(null);
        await fetchEmployees();
        if (onDataChange) onDataChange();
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UsersIcon size={28} color="#9B8FD8" />
                    Employee Directory
                </h2>
                <button className="btn btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PlusIcon size={18} color="white" />
                    Add Employee
                </button>
            </div>

            <div className="search-bar" style={{ marginTop: '2rem' }}>
                <span className="search-icon">
                    <SearchIcon size={20} color="#8B8B80" />
                </span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, email, department, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <MailboxIcon size={48} color="#9B9B90" />
                    </div>
                    <div className="empty-state-title">
                        {searchTerm ? 'No employees found' : 'No employees yet'}
                    </div>
                    <p style={{ marginTop: 'var(--spacing-sm)' }}>
                        {searchTerm ? 'Try adjusting your search criteria' : 'Add your first employee to get started'}
                    </p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')}>Name{getSortIndicator('name')}</th>
                                <th onClick={() => handleSort('email')}>Email{getSortIndicator('email')}</th>
                                <th onClick={() => handleSort('department')}>Department{getSortIndicator('department')}</th>
                                <th onClick={() => handleSort('role')}>Role{getSortIndicator('role')}</th>
                                <th onClick={() => handleSort('phone')}>Phone{getSortIndicator('phone')}</th>
                                <th onClick={() => handleSort('age')}>Age{getSortIndicator('age')}</th>
                                <th onClick={() => handleSort('dateOfJoining')}>Joined{getSortIndicator('dateOfJoining')}</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td style={{ fontWeight: '500' }}>{employee.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{employee.email}</td>
                                    <td>
                                        <span className={`badge badge-${employee.department.toLowerCase()}`}>{employee.department}</span>
                                    </td>
                                    <td>{employee.role}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{employee.phone}</td>
                                    <td>{employee.age}</td>
                                    <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="icon-btn"
                                                onClick={() => handleEdit(employee)}
                                                title="Edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="icon-btn danger"
                                                onClick={() => setDeleteConfirm(employee.id)}
                                                title="Delete"
                                            >
                                                <TrashIcon size={16} color="#D86C5B" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
                            </h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <EmployeeForm
                                employee={selectedEmployee}
                                onSuccess={handleFormSuccess}
                                onCancel={() => setShowModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Confirm Delete</h3>
                            <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
