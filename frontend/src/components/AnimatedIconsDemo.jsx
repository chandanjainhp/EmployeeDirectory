import React from 'react';
import { PlugConnectedIcon } from './icons';


const AnimatedIconsDemo = () => {
    return (
        <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
            <h3 style={{
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#3A3A3A'
            }}>
                🎨 Animated Icons Demo
            </h3>

            <p style={{
                marginBottom: '1.5rem',
                color: '#4A4A45',
                fontSize: '0.9375rem'
            }}>
                Hover over the icons to see the animations powered by the motion library
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1.5rem'
            }}>
              
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: '#FAF8F3',
                    borderRadius: '0.75rem',
                    border: '1px solid #E8E8E0',
                    transition: 'all 200ms ease'
                }}>
                    <PlugConnectedIcon size={32} color="#E07A5F" />
                    <span style={{ fontSize: '0.8125rem', color: '#9B9B90', textAlign: 'center' }}>
                        Small (32px)
                    </span>
                </div>

          
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: '#FAF8F3',
                    borderRadius: '0.75rem',
                    border: '1px solid #E8E8E0',
                    transition: 'all 200ms ease'
                }}>
                    <PlugConnectedIcon size={48} color="#F4A261" />
                    <span style={{ fontSize: '0.8125rem', color: '#9B9B90', textAlign: 'center' }}>
                        Medium (48px)
                    </span>
                </div>

        
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: '#FAF8F3',
                    borderRadius: '0.75rem',
                    border: '1px solid #E8E8E0',
                    transition: 'all 200ms ease'
                }}>
                    <PlugConnectedIcon size={64} color="#81A684" />
                    <span style={{ fontSize: '0.8125rem', color: '#9B9B90', textAlign: 'center' }}>
                        Large (64px)
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: '#FAF8F3',
                    borderRadius: '0.75rem',
                    border: '1px solid #E8E8E0',
                    transition: 'all 200ms ease'
                }}>
                    <PlugConnectedIcon size={48} color="#A26769" />
                    <span style={{ fontSize: '0.8125rem', color: '#9B9B90', textAlign: 'center' }}>
                        Custom Color
                    </span>
                </div>
            </div>

            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(224, 122, 95, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(224, 122, 95, 0.2)'
            }}>
                <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#D86C5B'
                }}>
                    Animation Features:
                </h4>
                <ul style={{
                    fontSize: '0.8125rem',
                    color: '#4A4A45',
                    paddingLeft: '1.5rem',
                    margin: 0
                }}>
                    <li>Plug prongs move upward on hover</li>
                    <li>Connection line shortens and fades</li>
                    <li>Socket scales up and moves down</li>
                    <li>Energy spark pulses continuously on hover</li>
                </ul>
            </div>
        </div>
    );
};

export default AnimatedIconsDemo;
