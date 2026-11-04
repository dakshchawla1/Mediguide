export default function Emergency() {
  const callNumber = (num) => window.open('tel:' + num)

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px', maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ color: '#f87171', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px', border: '1px solid rgba(220,38,38,0.2)', padding: '7px 18px', borderRadius: '100px', display: 'inline-block' }}>
          🚨 Emergency Mode
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#fca5a5', letterSpacing: '-2px', marginBottom: '16px' }}>
          Medical Emergency?<br />Don't Wait.
        </h1>
        <p style={{ color: '#7f5050', fontSize: '16px', marginBottom: '40px', lineHeight: 1.8 }}>
          Call 108 immediately for ambulance. Use 112 for all emergencies.
        </p>
        <button onClick={() => callNumber('108')} style={{ background: 'linear-gradient(135deg,#7f1d1d,#dc2626)', color: 'white', fontSize: '18px', fontWeight: 800, padding: '20px 48px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 0 60px rgba(220,38,38,0.4)', fontFamily: "'Inter', sans-serif" }}>
          🚨 Call 108 — Ambulance
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '14px' }}>
        {[
          { num: '108', name: 'Ambulance', icon: '🚑', desc: '24/7 Free Medical Emergency' },
          { num: '112', name: 'National Emergency', icon: '🆘', desc: 'Police + Fire + Ambulance' },
          { num: '100', name: 'Police', icon: '🚔', desc: '24/7 Law Enforcement' },
          { num: '101', name: 'Fire Brigade', icon: '🔥', desc: '24/7 Fire Emergency' },
          { num: '9152987821', name: 'Mental Health — iCall', icon: '🧠', desc: 'Mon–Sat 8AM–10PM' },
          { num: '18001116117', name: 'Poison Control', icon: '☠️', desc: 'AIIMS · 24/7 Free' },
        ].map(h => (
          <div key={h.num} style={{ background: '#08081a', border: '1px solid rgba(220,38,38,0.1)', borderRadius: '18px', padding: '22px', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px' }}>{h.icon}</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 900, color: '#f87171' }}>{h.num}</span>
            </div>
            <div style={{ fontWeight: 700, color: '#d0d0e8', marginBottom: '4px', fontSize: '14px' }}>{h.name}</div>
            <div style={{ color: '#5a5a80', fontSize: '12px', marginBottom: '14px' }}>{h.desc}</div>
            <button onClick={() => callNumber(h.num)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.05)', color: '#f87171', fontWeight: 700, cursor: 'pointer', fontSize: '12px', fontFamily: "'Inter',sans-serif" }}>
              📞 Call {h.num}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}