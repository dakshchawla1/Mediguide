export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '120px 24px 80px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)', color: '#c9a84c', fontSize: '11px', fontWeight: 600, padding: '7px 18px', borderRadius: '100px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '40px' }}>
        🇮🇳 AI-Powered · Hindi & English · Built for India
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '24px' }}>
        <span style={{ color: '#f0f0ff', display: 'block' }}>Your Medical Guide</span>
        <span style={{ display: 'block', background: 'linear-gradient(135deg, #8a6f2e, #f0d080, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'goldShimmer 5s linear infinite' }}>
          Anywhere in India
        </span>
      </h1>
      <p style={{ fontSize: '17px', color: '#5a5a80', lineHeight: 1.9, maxWidth: '520px', marginBottom: '48px' }}>
        Find the right doctor, hospital, or clinic near you.<br />
        Check your symptoms with AI — in Hindi or English, instantly.
      </p>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => window.location.href='/symptoms'} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, #8a6f2e, #c9a84c, #8a6f2e)', backgroundSize: '200% auto', color: '#04040c', fontSize: '14px', fontWeight: 700, padding: '15px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', boxShadow: '0 0 40px rgba(201,168,76,0.25)', animation: 'goldShimmer 4s linear infinite' }}>
          ⚕️ Check Symptoms with AI
        </button>
        <button onClick={() => window.location.href='/hospitals'} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#8888aa', fontSize: '14px', fontWeight: 500, padding: '15px 32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
          🗺️ Find Hospital Near Me
        </button>
      </div>
    </div>
  )
}