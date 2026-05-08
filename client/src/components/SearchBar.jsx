import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    // ฟังก์ชันเช็คว่าเมนูนี้กำลังถูกเลือกอยู่หรือไม่
    const isActive = (path) => currentPath.includes(path);

    // สไตล์พื้นฐานของปุ่มเมนู
    const linkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 20px',
        borderRadius: '16px',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '1.05rem',
        marginBottom: '8px',
        transition: 'all 0.2s ease-in-out'
    };

    return (
        <aside style={{
            width: '280px',
            minHeight: '100vh',
            backgroundColor: '#EAEBDB', // สีพื้นหลังครีม-เขียวอ่อน
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            borderRight: '1px solid #D1D5DB'
        }}>

            {/* โลโก้ */}
            <div style={{ marginBottom: '48px', paddingLeft: '8px' }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: '800',
                    fontStyle: 'italic',
                    color: '#536643', // สีเขียวขี้ม้า
                    letterSpacing: '-0.5px'
                }}>
                    taeketmaster<sup style={{ fontSize: '14px', fontWeight: 'bold' }}>®</sup>
                </h1>
            </div>

            {/* เมนูด้านบน */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* เมนู Dashboard */}
                <Link to="/admin/dashboard" style={{
                    ...linkStyle,
                    backgroundColor: isActive('/dashboard') ? '#6B7E54' : 'transparent',
                    color: isActive('/dashboard') ? '#FFFFFF' : '#1E1E1E',
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        backgroundColor: isActive('/dashboard') ? '#FFFFFF' : '#6B7E54',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {/* ไอคอนบ้าน (ปรับแต่ง SVG ตาม Figma ได้) */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive('/dashboard') ? '#6B7E54' : '#FFFFFF'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    Dashboard
                </Link>

                {/* เมนู Tables (กำลัง Active ในรูป) */}
                <Link to="/admin/tables" style={{
                    ...linkStyle,
                    backgroundColor: isActive('/tables') ? '#6B7E54' : 'transparent',
                    color: isActive('/tables') ? '#FFFFFF' : '#1E1E1E',
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        backgroundColor: isActive('/tables') ? '#FFFFFF' : '#6B7E54',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive('/tables') ? '#6B7E54' : '#FFFFFF'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                    </div>
                    Tables
                </Link>

                {/* เมนู Reports */}
                <Link to="/admin/reports" style={{
                    ...linkStyle,
                    backgroundColor: isActive('/reports') ? '#6B7E54' : 'transparent',
                    color: isActive('/reports') ? '#FFFFFF' : '#1E1E1E',
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        backgroundColor: isActive('/reports') ? '#FFFFFF' : '#6B7E54',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive('/reports') ? '#6B7E54' : '#FFFFFF'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                        </svg>
                    </div>
                    Reports
                </Link>

            </nav>

            {/* เส้นคั่น */}
            <hr style={{ border: 'none', borderTop: '2px solid #1E1E1E', margin: '24px 8px' }} />

            {/* เมนูด้านล่าง */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>

                {/* เมนู Account */}
                <Link to="/admin/account" style={{
                    ...linkStyle,
                    color: '#1E1E1E',
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        backgroundColor: '#6B7E54',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    Account
                </Link>

                {/* เมนู Log out */}
                <button style={{
                    ...linkStyle,
                    color: '#EF4444', // สีแดง
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit'
                }} onClick={() => alert('Logging out...')}>
                    <div style={{
                        width: '32px', height: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </div>
                    Log out
                </button>

            </div>
        </aside>
    );
}