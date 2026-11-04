const helplines = [
  { num: '108', name: 'Ambulance', icon: '🚑', desc: 'National ambulance — 24/7 Free', color: '#f87171' },
  { num: '112', name: 'National Emergency', icon: '🆘', desc: 'Police + Fire + Ambulance', color: '#f87171' },
  { num: '181', name: 'Women Helpline', icon: '👩', desc: 'Domestic violence, harassment — 24/7', color: '#f472b6' },
  { num: '1098', name: 'Childline India', icon: '👶', desc: 'Child abuse, missing — 24/7 Free', color: '#60a5fa' },
  { num: '14567', name: 'Elder Line', icon: '👴', desc: 'Senior citizens — 24/7 Free', color: '#c9a84c' },
  { num: '9152987821', name: 'iCall Mental Health', icon: '🧠', desc: 'TISS — Mon–Sat 8AM–10PM', color: '#a78bfa' },
  { num: '18602662345', name: 'Vandrevala Foundation', icon: '💜', desc: 'Mental health — 24/7 Free', color: '#a78bfa' },
  { num: '1075', name: 'COVID-19 Helpline', icon: '🦠', desc: 'Ministry of Health — 24/7', color: '#34d399' },
  { num: '14555', name: 'Ayushman Bharat', icon: '🇮🇳', desc: 'PMJAY health insurance', color: '#c9a84c' },
  { num: '18001116117', name: 'Poison Control', icon: '☠️', desc: 'AIIMS — 24/7 Free', color: '#f87171' },
  { num: '18001800444', name: 'TB Helpline — Nikshay', icon: '🫁', desc: '24/7 Free treatment guidance', color: '#34d399' },
  { num: '1091', name: 'Women Police Helpline', icon: '🛡️', desc: 'NCW — 24/7 Free', color: '#f472b6' },
]

export default function Helplines() {
  const [search, setSearch] = useState('')
  const filtered = helplines.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.desc.toLowerCase().includes(search.toLowerCase()) ||
    h.num.includes(search)
  )

  function callNum(num) { window.open('tel:' + num) }
  function copyNum(num) {
    navigator.clipboard.writeText(num).then(() => alert('Copied: ' + num))
  }

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ color: '#c9a84c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 18px', borderRadius: '100px', display: 'inline-block' }}>
        📞 India Health Helplines
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#f0f0ff', letterSpacing: '-1.5px', marginBottom: '16px' }}>
        All <span style={{ background: 'linear-gradient(135deg,#8a6f2e,#f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Helplines</span> in One Place
      </h1>
      <p style={{ color: '#5a5a80', fontSize: '16px', marginBottom: '32px', lineHeight: 1.8 }}>
        Every important Indian health helpline — tap any number to call instantly.
      </p>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Search helplines — e.g. Ambulance, Mental health, Women..."
        style={{ width: '100%', background: '#08081a', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '14px', padding: '16px 20px', color: '#e8e8f8', fontSize: '14px', fontFamily: "'Inter',sans-serif", outline: 'none', marginBottom: '32px' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '16px' }}>
        {filtered.map(h => (
          <div key={h.num} style={{ background: '#08081a', border: '1px solid rgba(201,168,76,0.08)', borderRadius: '20px', padding: '24px', transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '26px' }}>{h.icon}</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 900, color: h.color, cursor: 'pointer' }} onClick={() => copyNum(h.num)}>{h.num}</span>
            </div>
            <div style={{ fontWeight: 700, color: '#d0d0e8', fontSize: '15px', marginBottom: '6px' }}>{h.name}</div>
            <div style={{ color: '#5a5a80', fontSize: '12px', marginBottom: '16px', lineHeight: 1.5 }}>{h.desc}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => callNum(h.num)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.06)', color: '#f0d080', fontWeight: 700, cursor: 'pointer', fontSize: '12px', fontFamily: "'Inter',sans-serif" }}>
                📞 Call
              </button>
              <button onClick={() => copyNum(h.num)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.08)', background: 'transparent', color: '#5a5a80', cursor: 'pointer', fontSize: '13px', fontFamily: "'Inter',sans-serif" }}>
                📋
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'