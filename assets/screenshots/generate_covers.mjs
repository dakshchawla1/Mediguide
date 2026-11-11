/**
 * MediGuide Banner & Cover Photo Generator
 * Generates ultra-sharp, high-DPI cover photos:
 * 1. LinkedIn Profile Banner (1584 x 396)
 * 2. Social OpenGraph / GitHub Preview (1200 x 630)
 */

import puppeteer from 'puppeteer';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
const DESKTOP_DIR = 'C:\\Users\\Daksh\\OneDrive\\Desktop\\MediGuide_Post_Material';

// HTML Template for LinkedIn Banner (1584 x 396)
const linkedinBannerHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1584px;
    height: 396px;
    background: #070b14;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
  }

  /* Ambient Mesh Lighting */
  .glow-cyan {
    position: absolute;
    top: -120px;
    right: 15%;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.28) 0%, rgba(14, 165, 233, 0) 70%);
    filter: blur(40px);
    pointer-events: none;
  }
  .glow-red {
    position: absolute;
    bottom: -150px;
    right: 5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0) 70%);
    filter: blur(50px);
    pointer-events: none;
  }
  .glow-purple {
    position: absolute;
    top: -100px;
    left: 280px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, rgba(124, 58, 237, 0) 70%);
    filter: blur(50px);
    pointer-events: none;
  }

  /* Grid overlay */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 36px 36px;
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 80%);
  }

  /* Background EKG Pulse Wave */
  .pulse-svg {
    position: absolute;
    bottom: 25px;
    left: 0;
    width: 100%;
    height: 100px;
    opacity: 0.25;
    pointer-events: none;
  }

  /* Content Container — left offset gives safe space for LinkedIn circle photo */
  .content {
    position: relative;
    z-index: 10;
    padding-left: 360px; /* Safe space for LinkedIn circular profile picture */
    padding-right: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .left-col {
    max-width: 760px;
  }

  /* Badge */
  .top-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.35);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #38bdf8;
    margin-bottom: 12px;
  }
  .top-badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0ea5e9;
    box-shadow: 0 0 8px #38bdf8;
  }

  /* Brand Header (Logo + Title) */
  .brand-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 10px;
  }

  .brand-icon-box {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
    box-shadow: 0 0 25px rgba(14, 165, 233, 0.55), 0 8px 16px rgba(2, 132, 199, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
  }
  .brand-icon-box svg {
    width: 32px;
    height: 32px;
  }

  .brand-name {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  .brand-name span.dot {
    color: #38bdf8;
    margin-left: 2px;
  }
  .brand-tag {
    margin-left: 14px;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #94a3b8;
    text-transform: uppercase;
  }

  /* Headline */
  .headline {
    font-size: 23px;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: #f1f5f9;
    line-height: 1.25;
    margin-bottom: 14px;
  }
  .headline .highlight {
    background: linear-gradient(90deg, #38bdf8 0%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Feature Pills */
  .pills-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    border: 1px solid;
  }
  .pill-sos {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.35);
    color: #f87171;
  }
  .pill-meds {
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.35);
    color: #34d399;
  }
  .pill-triage {
    background: rgba(168, 85, 247, 0.12);
    border-color: rgba(168, 85, 247, 0.35);
    color: #c084fc;
  }
  .pill-opd {
    background: rgba(245, 158, 11, 0.12);
    border-color: rgba(245, 158, 11, 0.35);
    color: #fbbf24;
  }

  /* Right Side Info Box */
  .right-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    text-align: right;
  }
  .url-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(56, 189, 248, 0.4);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #38bdf8;
  }
  .stat-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 10px 16px;
    display: flex;
    gap: 18px;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
  }
  .stat-val {
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
  }
  .stat-lbl {
    font-size: 10px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-cyan"></div>
  <div class="glow-purple"></div>
  <div class="glow-red"></div>

  <!-- Pulse Wave SVG -->
  <svg class="pulse-svg" viewBox="0 0 1584 100" fill="none">
    <path d="M0,50 L400,50 L430,50 L445,20 L460,85 L475,35 L490,65 L505,50 L850,50 L880,50 L895,15 L910,88 L925,30 L940,68 L955,50 L1584,50" 
          stroke="url(#pulse-gradient)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
      <linearGradient id="pulse-gradient" x1="0" y1="0" x2="1584" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
        <stop offset="30%" stop-color="#38bdf8" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#818cf8" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.2"/>
      </linearGradient>
    </defs>
  </svg>

  <div class="content">
    <div class="left-col">
      <div class="top-badge">
        <span class="dot"></span>
        Verified National Clinical Platform • India
      </div>

      <div class="brand-row">
        <div class="brand-icon-box">
          <svg viewBox="0 0 36 36" fill="none">
            <rect x="13" y="3" width="10" height="30" rx="3" fill="#ffffff"/>
            <rect x="3" y="13" width="30" height="10" rx="3" fill="#ffffff"/>
            <path d="M2 22 L7 22 L10 16 L13 26 L16 18 L19 24 L22 20 L25 22 L28 22" 
                  stroke="#0284c7" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="brand-name">MediGuide<span class="dot">•</span></div>
        <div class="brand-tag">Open Source</div>
      </div>

      <div class="headline">
        Healthcare guidance. <span class="highlight">Clear, fast, and verified.</span>
      </div>

      <div class="pills-row">
        <span class="pill pill-sos">🚨 Emergency SOS 108</span>
        <span class="pill pill-meds">💊 Jan Aushadhi (Save 85%)</span>
        <span class="pill pill-triage">🧠 AI Symptom Triage</span>
        <span class="pill pill-opd">🏥 Hospital OPD Timings</span>
      </div>
    </div>

    <div class="right-col">
      <div class="url-badge">
        <span>🌐</span> mediguide-xi.vercel.app
      </div>
      <div class="stat-card">
        <div class="stat-item">
          <span class="stat-val">50+</span>
          <span class="stat-lbl">Govt Hospitals</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">85%</span>
          <span class="stat-lbl">Medicine Savings</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">24/7</span>
          <span class="stat-lbl">Free Access</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// HTML Template for Social / OpenGraph / GitHub Banner (1200 x 630)
const socialCoverHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #060913;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 70px;
  }

  .glow-cyan {
    position: absolute;
    top: -150px;
    right: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(14, 165, 233, 0) 70%);
    filter: blur(50px);
    pointer-events: none;
  }
  .glow-purple {
    position: absolute;
    bottom: -150px;
    left: 20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(124, 58, 237, 0) 70%);
    filter: blur(60px);
    pointer-events: none;
  }
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .top-bar {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .brand-group {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .brand-icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
    box-shadow: 0 0 30px rgba(14, 165, 233, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .brand-icon-box svg {
    width: 38px;
    height: 38px;
  }
  .brand-title {
    font-size: 44px;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #ffffff;
  }
  .brand-title span { color: #38bdf8; }

  .national-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.4);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #38bdf8;
  }

  .main-content {
    position: relative;
    z-index: 10;
    margin-top: 20px;
  }
  .hero-heading {
    font-size: 54px;
    font-weight: 900;
    letter-spacing: -0.035em;
    line-height: 1.15;
    margin-bottom: 20px;
  }
  .hero-heading span.grad {
    background: linear-gradient(90deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 20px;
    color: #94a3b8;
    line-height: 1.5;
    max-width: 880px;
    margin-bottom: 32px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  .feat-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 12px;
    padding: 16px 18px;
    backdrop-filter: blur(10px);
  }
  .feat-tag {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .feat-title {
    font-size: 15px;
    font-weight: 800;
    color: #f1f5f9;
    margin-bottom: 4px;
  }
  .feat-desc {
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.35;
  }

  .footer-bar {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 20px;
  }
  .url-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    color: #38bdf8;
  }
  .tech-pills {
    display: flex;
    gap: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }
  .tech-pills span {
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 10px;
    border-radius: 6px;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-cyan"></div>
  <div class="glow-purple"></div>

  <div class="top-bar">
    <div class="brand-group">
      <div class="brand-icon-box">
        <svg viewBox="0 0 36 36" fill="none">
          <rect x="13" y="3" width="10" height="30" rx="3" fill="#ffffff"/>
          <rect x="3" y="13" width="30" height="10" rx="3" fill="#ffffff"/>
          <path d="M2 22 L7 22 L10 16 L13 26 L16 18 L19 24 L22 20 L25 22 L28 22" 
                stroke="#0284c7" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="brand-title">MediGuide<span>•</span></div>
    </div>
    <div class="national-badge">
      🇮🇳 Verified National Clinical Portal
    </div>
  </div>

  <div class="main-content">
    <div class="hero-heading">
      Healthcare guidance.<br/>
      <span class="grad">Clear, fast, and verified.</span>
    </div>
    <div class="hero-sub">
      Intelligent AI symptom triage, verified Jan Aushadhi generic medicines saving up to 85%, and live government hospital OPD schedules across India.
    </div>

    <div class="features-grid">
      <div class="feat-card" style="border-top: 2px solid #ef4444;">
        <div class="feat-tag">🚨</div>
        <div class="feat-title">Emergency SOS 108</div>
        <div class="feat-desc">Instant 24/7 ambulance dispatch & GPS lifeline</div>
      </div>
      <div class="feat-card" style="border-top: 2px solid #10b981;">
        <div class="feat-tag">💊</div>
        <div class="feat-title">Jan Aushadhi Generic</div>
        <div class="feat-desc">Bio-equivalent medicines at up to 85% discount</div>
      </div>
      <div class="feat-card" style="border-top: 2px solid #a855f7;">
        <div class="feat-tag">🧠</div>
        <div class="feat-title">AI Clinical Triage</div>
        <div class="feat-desc">Guided condition severity evaluation</div>
      </div>
      <div class="feat-card" style="border-top: 2px solid #f59e0b;">
        <div class="feat-tag">🏥</div>
        <div class="feat-title">OPD Schedules</div>
        <div class="feat-desc">AIIMS, Safdarjung & 50+ government hospitals</div>
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <div class="url-tag">🌐 https://mediguide-xi.vercel.app</div>
    <div class="tech-pills">
      <span>Vanilla JS</span>
      <span>Modern CSS3</span>
      <span>HTML5</span>
      <span>Zero Server Cost</span>
      <span>Vercel Edge</span>
    </div>
  </div>
</body>
</html>
`;

async function generate() {
  console.log('🎨 Generating cover photos with Chrome...\n');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Generate LinkedIn Profile Banner (1584 x 396)
  console.log('Rendering 1: LinkedIn Profile Banner (1584 x 396)...');
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1584, height: 396, deviceScaleFactor: 2 });
  await page1.setContent(linkedinBannerHtml, { waitUntil: 'networkidle0' });
  const linkedinBannerPath = join(OUT_DIR, '00_LINKEDIN_PROFILE_COVER_BANNER.png');
  await page1.screenshot({ path: linkedinBannerPath });
  console.log('  ✅ Saved →', linkedinBannerPath);
  await page1.close();

  // 2. Generate Social OpenGraph / GitHub Cover (1200 x 630)
  console.log('\nRendering 2: Social & Website OpenGraph Cover (1200 x 630)...');
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page2.setContent(socialCoverHtml, { waitUntil: 'networkidle0' });
  const socialCoverPath = join(OUT_DIR, '00_WEBSITE_SOCIAL_COVER_OG.png');
  await page2.screenshot({ path: socialCoverPath });
  console.log('  ✅ Saved →', socialCoverPath);
  await page2.close();

  await browser.close();

  // Copy both directly to the Desktop material folder
  if (existsSync(DESKTOP_DIR)) {
    copyFileSync(linkedinBannerPath, join(DESKTOP_DIR, '00_LINKEDIN_PROFILE_COVER_BANNER.png'));
    copyFileSync(socialCoverPath, join(DESKTOP_DIR, '00_WEBSITE_SOCIAL_COVER_OG.png'));
    console.log('\n📁 Also copied both files to your Desktop: MediGuide_Post_Material\\');
  }

  console.log('\n🎉 Done! All cover photos generated at ultra-sharp 2x resolution.');
}

generate().catch(err => {
  console.error('Error generating banners:', err);
  process.exit(1);
});
