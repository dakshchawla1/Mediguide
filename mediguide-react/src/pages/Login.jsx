import { useState } from 'react'

export default function Login() {
  const [tab, setTab] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function handleSignIn() {
    if (!email || !password) { alert('Please fill in all fields'); return }
    if (!email.includes('@')) { alert('Please enter a valid email'); return }
    alert('✅ Sign-in coming in Week 5 with Firebase!')
    window.location.href = '/'
  }

  function handleSignUp() {
    if (!name || !email || !password) { alert('Please fill in all fields'); return }
    alert('✅ Account creation coming in Week 5 with Firebase!')
    window.location.href = '/'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: '460px', background: '#08081a', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '28px', padding: '48px 40px' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '68px', height: '68px', background: 'linear-gradient(135deg,#8a6f2e,#c9a84c)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px', boxShadow: '0 0 40px rgba(201,168,76,0.25)' }}>⚕️</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 900, color: '#f0f0ff', marginBottom: '8px' }}>Welcome to MediGuide</h1>
          <p style={{ color: '#5a5a80', fontSize: '14px', lineHeight: 1.6 }}>Sign in to save your health history and preferences</p>
        </div>

        <button onClick={() => alert('Google Sign-in coming in Week 5 with Firebase!')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'white', color: '#1a1a2e', fontSize: '15px', fontWeight: 600, padding: '15px 24px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0 4px 24px rgba(0,0,0,0.3)', marginBottom: '20px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.08)' }}></div>
          <span style={{ fontSize: '12px', color: '#2e2e50' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.08)' }}></div>
        </div>

        <div style={{ display: 'flex', background: '#04040c', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
          {['signin','signup'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '11px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", background: tab === t ? 'rgba(201,168,76,0.1)' : 'transparent', color: tab === t ? '#f0d080' : '#5a5a80', transition: 'all 0.2s' }}>
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {tab === 'signin' ? (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ width: '100%', background: '#04040c', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8e8f8', fontSize: '14px', fontFamily: "'Inter',sans-serif", outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" style={{ width: '100%', background: '#04040c', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8e8f8', fontSize: '14px', fontFamily: "'Inter',sans-serif", outline: 'none' }} />
            </div>
            <button onClick={handleSignIn} style={{ width: '100%', background: 'linear-gradient(135deg,#8a6f2e,#c9a84c,#8a6f2e)', backgroundSize: '200% auto', color: '#04040c', fontSize: '15px', fontWeight: 700, padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", animation: 'goldShimmer 4s linear infinite' }}>
              Sign In to MediGuide →
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={{ width: '100%', background: '#04040c', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8e8f8', fontSize: '14px', fontFamily: "'Inter',sans-serif", outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ width: '100%', background: '#04040c', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8e8f8', fontSize: '14px', fontFamily: "'Inter',sans-serif", outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Create a password (min 6 chars)" style={{ width: '100%', background: '#04040c', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8e8f8', fontSize: '14px', fontFamily: "'Inter',sans-serif", outline: 'none' }} />
            </div>
            <button onClick={handleSignUp} style={{ width: '100%', background: 'linear-gradient(135deg,#8a6f2e,#c9a84c,#8a6f2e)', backgroundSize: '200% auto', color: '#04040c', fontSize: '15px', fontWeight: 700, padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
              Create Account →
            </button>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#5a5a80' }}>
          🔒 Your data is private and secure
        </div>
      </div>
    </div>
  )
}