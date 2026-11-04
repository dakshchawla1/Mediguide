import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/symptoms', label: 'Symptoms' },
    { to: '/hospitals', label: 'Hospitals' },
    { to: '/emergency', label: 'Emergency' },
    { to: '/medicines', label: 'Medicines' },
    { to: '/helplines', label: 'Helplines' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '72px',
        background: 'rgba(4,4,12,0.85)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        transition: 'all 0.3s'
      }}>

        {/* LOGO */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #8a6f2e, #c9a84c)',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '16px'
          }}>⚕️</div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px', fontWeight: 700, color: '#f0d080'
          }}>MediGuide</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)'
        }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              color: location.pathname === link.to ? '#f0d080' : '#5a5a80',
              textDecoration: 'none', fontSize: '13px', fontWeight: 500,
              padding: '8px 16px', borderRadius: '8px',
              background: location.pathname === link.to ? 'rgba(201,168,76,0.06)' : 'transparent',
              transition: 'all 0.2s'
            }}>{link.label}</Link>
          ))}
        </div>

        {/* RIGHT BUTTONS - Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/login" style={{ color: '#5a5a80', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>
            Sign in
          </Link>
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #8a6f2e, #c9a84c)',
            color: '#04040c', textDecoration: 'none', fontSize: '13px',
            fontWeight: 700, padding: '9px 20px', borderRadius: '8px',
            boxShadow: '0 0 24px rgba(201,168,76,0.2)'
          }}>Get Started →</Link>
        </div>

        {/* HAMBURGER */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            cursor: 'pointer', padding: '8px', zIndex: 1001
          }}
          className="hamburger-btn"
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#f0d080', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#f0d080', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#f0d080', borderRadius: '2px' }}></span>
        </div>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0,
          background: 'rgba(4,4,12,0.98)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column',
          gap: '4px', zIndex: 999
        }}>
          {links.map(link => (
            <Link key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                color: '#5a5a80', textDecoration: 'none', fontSize: '15px',
                fontWeight: 500, padding: '12px 16px', borderRadius: '10px'
              }}>
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} style={{
            background: 'linear-gradient(135deg, #8a6f2e, #c9a84c)',
            color: '#04040c', textDecoration: 'none', fontSize: '14px',
            fontWeight: 700, padding: '12px 16px', borderRadius: '10px',
            textAlign: 'center', marginTop: '8px'
          }}>Get Started →</Link>
        </div>
      )}
    </>
  )
}