import React from 'react';
import { ChartIcon, UsersIcon } from './icons';

/**
 * Navigation component with tab-based navigation
 */
const Navigation = ({ currentPage, onNavigate }) => {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: ChartIcon },
        { id: 'employees', label: 'Employees', icon: UsersIcon }
    ];

    return (
        <nav style={{
            background: '#FEFEFE',
            borderBottom: '2px solid #E8E8E0',
            boxShadow: '0 2px 8px rgba(58, 58, 58, 0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'flex',
                gap: '0.5rem'
            }}>
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = currentPage === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onNavigate(tab.id)}
                            style={{
                                padding: '1rem 1.5rem',
                                background: isActive
                                    ? 'linear-gradient(135deg, #F4845F 0%, #E07A5F 100%)'
                                    : 'transparent',
                                color: isActive ? '#FFFFFF' : '#6B6B65',
                                border: 'none',
                                borderBottom: isActive ? '3px solid #E07A5F' : '2px solid transparent',
                                cursor: 'pointer',
                                fontSize: '0.9375rem',
                                fontWeight: isActive ? '600' : '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                                borderRadius: '0.5rem 0.5rem 0 0',
                                fontFamily: 'inherit'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'rgba(224, 122, 95, 0.1)';
                                    e.currentTarget.style.color = '#E07A5F';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#6B6B65';
                                }
                            }}
                        >
                            <Icon size={20} color={isActive ? '#FFFFFF' : '#9B9B90'} />
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navigation;
