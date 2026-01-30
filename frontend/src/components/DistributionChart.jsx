import React from 'react';


const DistributionChart = ({ data, title, gradientColors = 'linear-gradient(135deg, #9B8FD8 0%, #A89FDB 100%)' }) => {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: '#3A3A3A' }}>
                    {title}
                </h3>
                <div className="empty-state" style={{ padding: '2rem' }}>
                    <p style={{ color: '#9B9B90' }}>No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: '#3A3A3A' }}>
                {title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.map((item, index) => {
                    const label = item.department || item.ageRange || item.label;
                    const percentage = item.percentage;
                    const count = item.count;

                    return (
                        <div key={index} style={{ animation: `slideUp 300ms ease ${index * 50}ms both` }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem',
                                fontSize: '0.875rem'
                            }}>
                                <span style={{ fontWeight: '500', color: '#3A3A3A' }}>{label}</span>
                                <span style={{ color: '#6B6B65' }}>
                                    {count} ({percentage}%)
                                </span>
                            </div>
                            <div style={{
                                height: '10px',
                                background: '#E5E3DD',
                                borderRadius: '9999px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <div
                                    style={{
                                        height: '100%',
                                        width: `${percentage}%`,
                                        background: gradientColors,
                                        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                        borderRadius: '9999px',
                                        boxShadow: '0 0 10px rgba(155, 143, 216, 0.3)'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DistributionChart;

