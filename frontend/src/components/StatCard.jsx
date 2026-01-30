import React from 'react';

const StatCard = ({ icon, label, value, suffix = '', subtitle = '', trend = null }) => {
    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">
                {value}{suffix}
            </div>
            {subtitle && (
                <div style={{
                    fontSize: '0.8125rem',
                    color: '#9B9B90',
                    marginTop: '0.5rem',
                    fontWeight: '400'
                }}>
                    {subtitle}
                </div>
            )}
            {trend && (
                <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: trend.direction === 'up' ? '#10b981' : '#ef4444'
                }}>
                    <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
                    <span>{trend.value}%</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;

