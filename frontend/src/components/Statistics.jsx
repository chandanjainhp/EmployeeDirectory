import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import StatCard from './StatCard';
import DistributionChart from './DistributionChart';
import TenureBreakdown from './TenureBreakdown';
import { UsersIcon, CalendarIcon, BuildingIcon, CakeIcon, StarIcon, PlugConnectedIcon, ChartIcon, TrophyIcon, MedalIcon } from './icons';
import {
    calculateDepartmentDistribution,
    calculateAgeDistribution,
    calculateAverageTenure,
    calculateAverageAge,
    calculateTenureDistribution,
    getTopDepartments,
    getNewestEmployee,
    getLongestTenureEmployee
} from '../utils/statisticsUtils';

const Statistics = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await employeeAPI.getAll();
            setEmployees(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to load employee data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <span>!</span>
                <span>{error}</span>
            </div>
        );
    }

    if (!employees || employees.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">
                    <ChartIcon size={48} color="#9B9B90" />
                </div>
                <div className="empty-state-title">No Statistics Available</div>
                <p style={{ marginTop: '0.5rem' }}>Add employees to see statistics</p>
            </div>
        );
    }

    // Calculate all statistics using utility functions
    const departmentDistribution = calculateDepartmentDistribution(employees);
    const ageDistribution = calculateAgeDistribution(employees);
    const tenureDistribution = calculateTenureDistribution(employees);
    const averageTenure = calculateAverageTenure(employees);
    const averageAge = calculateAverageAge(employees);
    const topDepartments = getTopDepartments(departmentDistribution, 3);
    const newestEmployee = getNewestEmployee(employees);
    const longestTenureEmployee = getLongestTenureEmployee(employees);

    // Calculate tenure for newest and longest tenure employees
    const calculateTenure = (dateOfJoining) => {
        const joinDate = new Date(dateOfJoining);
        const today = new Date();
        const years = (today - joinDate) / (1000 * 60 * 60 * 24 * 365.25);
        return years.toFixed(1);
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ChartIcon size={28} color="#9B8FD8" />
                Statistics Dashboard
            </h2>

            {/* Main Statistics Cards */}
            <div className="stats-grid">
                <StatCard
                    icon={<UsersIcon size={32} color="#7B91E8" />}
                    label="Total Employees"
                    value={employees.length}
                    subtitle="Active workforce"
                />

                <StatCard
                    icon={<CalendarIcon size={32} color="#9B8FD8" />}
                    label="Average Tenure"
                    value={averageTenure}
                    suffix=" years"
                    subtitle="Company experience"
                />

                <StatCard
                    icon={<BuildingIcon size={32} color="#E89BB3" />}
                    label="Departments"
                    value={departmentDistribution.length}
                    subtitle={topDepartments[0] ? `Top: ${topDepartments[0].department}` : ''}
                />

                <StatCard
                    icon={<CakeIcon size={32} color="#FF9771" />}
                    label="Average Age"
                    value={averageAge}
                    suffix=" years"
                    subtitle="Workforce age"
                />

                {newestEmployee && (
                    <StatCard
                        icon={<StarIcon size={32} color="#F4845F" />}
                        label="Newest Employee"
                        value={newestEmployee.name}
                        subtitle={`Joined ${new Date(newestEmployee.dateOfJoining).toLocaleDateString()}`}
                    />
                )}

                {longestTenureEmployee && (
                    <StatCard
                        icon={<PlugConnectedIcon size={32} color="#81A684" />}
                        label="Longest Tenure"
                        value={longestTenureEmployee.name}
                        subtitle={`${calculateTenure(longestTenureEmployee.dateOfJoining)} years of service`}
                    />
                )}
            </div>

            {/* Distribution Charts */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginTop: '3rem'
            }}>
                <DistributionChart
                    data={departmentDistribution}
                    title={<span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BuildingIcon size={18} color="#9B8FD8" /> Department Distribution</span>}
                    gradientColors="linear-gradient(135deg, #9B8FD8 0%, #A89FDB 100%)"
                />

                <DistributionChart
                    data={ageDistribution}
                    title={<span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CakeIcon size={18} color="#E89BB3" /> Age Distribution</span>}
                    gradientColors="linear-gradient(135deg, #E89BB3 0%, #EB9FB5 100%)"
                />
            </div>

            {/* Tenure Breakdown */}
            <div style={{ marginTop: '2rem' }}>
                <TenureBreakdown data={tenureDistribution} />
            </div>

            {/* Top Departments Summary */}
            {topDepartments.length > 0 && (
                <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: '#3A3A3A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrophyIcon size={20} color="#F4845F" />
                        Top Departments
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {topDepartments.map((dept, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, #FAF8F3 0%, #FEFEFE 100%)',
                                    borderRadius: '0.75rem',
                                    border: '2px solid #E8E8E0',
                                    textAlign: 'center',
                                    transition: 'all 200ms ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = '#E07A5F';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(224, 122, 95, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = '#E8E8E0';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '0.75rem'
                                }}>
                                    <MedalIcon size={32} rank={index + 1} />
                                </div>
                                <div style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    marginBottom: '0.25rem',
                                    color: '#3A3A3A'
                                }}>
                                    {dept.department}
                                </div>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    background: 'linear-gradient(135deg, #E07A5F 0%, #F4A261 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    marginBottom: '0.25rem'
                                }}>
                                    {dept.count}
                                </div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: '#9B9B90'
                                }}>
                                    {dept.percentage}% of total
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;
