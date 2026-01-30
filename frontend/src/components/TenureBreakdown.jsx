import React from 'react';
import { CalendarIcon } from './icons';

/**
 * Tenure breakdown visualization component
 * @param {Array} data - Array of {tenureRange, count, percentage}
 */
const TenureBreakdown = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: '#3A3A3A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CalendarIcon size={18} color="#9B8FD8" />
                    Tenure Breakdown
                </h3>
                <div className="empty-state" style={{ padding: '2rem' }}>
                    <p style={{ color: '#9B9B90' }}>No tenure data available</p>
                </div>
            </div>
        );
    }

    // Color scheme for different tenure ranges - warm, muted palette
    const getColorForRange = (range) => {
        const colors = {
            '0-1 years': 'linear-gradient(135deg, #81A684 0%, #9BC19E 100%)', // Sage green
            '1-3 years': 'linear-gradient(135deg, #7B91E8 0%, #8B9FDB 100%)', // Soft blue
            '3-5 years': 'linear-gradient(135deg, #9B8FD8 0%, #A89FDB 100%)', // Soft purple
            '5-10 years': 'linear-gradient(135deg, #E89BB3 0%, #EB9FB5 100%)', // Warm pink
            '10+ years': 'linear-gradient(135deg, #FF9771 0%, #F4845F 100%)' // Warm coral
        };
        return colors[range] || 'linear-gradient(135deg, #9B8FD8 0%, #A89FDB 100%)';
    };



    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: '#3A3A3A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon size={18} color="#9B8FD8" />
                Tenure Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            animation: `slideUp 300ms ease ${index * 50}ms both`,
                            padding: '1rem',
                            background: 'rgba(168, 168, 181, 0.15)',
                            borderRadius: '0.75rem',
                            border: '1px solid #DED9D0',
                            transition: 'all 200ms ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(168, 168, 181, 0.25)';
                            e.currentTarget.style.borderColor = '#9B8FD8';
                            e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(168, 168, 181, 0.15)';
                            e.currentTarget.style.borderColor = '#DED9D0';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.75rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: '600', color: '#3A3A3A', fontSize: '0.9375rem' }}>
                                    {item.tenureRange}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    background: getColorForRange(item.tenureRange),
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {item.count}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#6B6B65' }}>
                                    {item.percentage}%
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height: '6px',
                            background: '#E5E3DD',
                            borderRadius: '9999px',
                            overflow: 'hidden'
                        }}>
                            <div
                                style={{
                                    height: '100%',
                                    width: `${item.percentage}%`,
                                    background: getColorForRange(item.tenureRange),
                                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    borderRadius: '9999px',
                                    boxShadow: '0 0 8px rgba(155, 143, 216, 0.3)'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TenureBreakdown;
