export default function Hospitals() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '120px 24px' }}>
      <div style={{ color: '#c9a84c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px', border: '1px solid rgba(201,168,76,0.2)', padding: '7px 18px', borderRadius: '100px' }}>
        🗺️ Live Facility Finder
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#f0f0ff', letterSpacing: '-1.5px', marginBottom: '16px' }}>
        Find <span style={{ background: 'linear-gradient(135deg,#8a6f2e,#f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hospitals</span> Near You
      </h1>
      <p style={{ color: '#5a5a80', fontSize: '16px', marginBottom: '40px', textAlign: 'center', maxWidth: '560px', lineHeight: 1.8 }}>
        Search for government hospitals, private hospitals, clinics and diagnostic labs near you.
      </p>
      <div style={{ background: '#08081a', border: '1px solid rgba(201,168,76,0.08)', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '720px' }}>
        <p style={{ color: '#5a5a80', textAlign: 'center', fontSize: '14px' }}>
          🚧 Live Google Maps integration coming in Week 6!
        </p>
        <p style={{ color: '#2a2a45', textAlign: 'center', fontSize: '12px', marginTop: '8px' }}>
          The HTML version is fully working in your hospitals.html file
        </p>
      </div>
    </div>
  )
}