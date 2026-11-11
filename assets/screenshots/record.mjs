/**
 * MediGuide — LinkedIn Demo Screen Recorder
 * Uses Puppeteer v21+ built-in page.screencast() to record a WebM video.
 * Run: node assets/screenshots/record.mjs
 */

import puppeteer from 'puppeteer';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Point Puppeteer's internal ffmpeg at the npm-installed binary
const require = createRequire(import.meta.url);
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
process.env.PUPPETEER_FFMPEG_PATH = ffmpegPath;
process.env.FFMPEG_PATH = ffmpegPath;
const ffmpegDir = dirname(ffmpegPath);
process.env.PATH = `${ffmpegDir};${process.env.PATH}`;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://mediguide-xi.vercel.app';
const OUT_FILE = join(OUT_DIR, 'mediguide_demo.webm');

async function record() {
  console.log('🎬 Launching browser for screen recording...\n');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--autoplay-policy=no-user-gesture-required',
    ],
  });

  const page = await browser.newPage();

  // 1280x720 — standard HD, good for LinkedIn
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  // ── Start recording ──────────────────────────────────────────────────────
  const recorder = await page.screencast({ path: OUT_FILE });
  console.log(`📹 Recording started → ${OUT_FILE}\n`);

  // ── Scene 1: Homepage (5s) ───────────────────────────────────────────────
  console.log('Scene 1: Homepage hero...');
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2500);

  // Slow scroll down to reveal feature cards
  for (let i = 0; i < 6; i++) {
    await page.evaluate((step) => window.scrollBy(0, step), 120);
    await sleep(120);
  }
  await sleep(1500);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(1000);

  // ── Scene 2: Type in search bar (4s) ────────────────────────────────────
  console.log('Scene 2: Search bar interaction...');
  try {
    await page.click('.search-bar input, #globalSearch, input[type="search"], input[placeholder*="Search"]');
    await sleep(400);
    await page.keyboard.type('chest pain', { delay: 80 });
    await sleep(1500);
    await page.keyboard.press('Escape');
  } catch (e) {
    console.log('  ⚠️  Search click skipped:', e.message);
  }
  await sleep(500);

  // ── Scene 3: Navigate to Emergency (5s) ─────────────────────────────────
  console.log('Scene 3: Emergency page...');
  await page.goto(`${BASE}/emergency.html`, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(3000);

  // Hover over 108 button for pulse effect
  try {
    const btn = await page.$('.sos-btn, .emergency-btn, a[href*="tel:108"], button');
    if (btn) {
      await btn.hover();
      await sleep(1500);
    }
  } catch (e) {}
  await sleep(500);

  // ── Scene 4: Symptoms page (5s) ──────────────────────────────────────────
  console.log('Scene 4: Symptoms / AI triage...');
  await page.goto(`${BASE}/symptoms.html`, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  try {
    const textarea = await page.$('textarea, #symptomsInput, input[placeholder*="symptom"]');
    if (textarea) {
      await textarea.click();
      await sleep(300);
      await page.keyboard.type('fever, headache, body ache for 3 days', { delay: 60 });
      await sleep(1500);
    }
  } catch (e) {}
  await sleep(500);

  // ── Scene 5: Medicines page (5s) ─────────────────────────────────────────
  console.log('Scene 5: Medicines / Jan Aushadhi...');
  await page.goto(`${BASE}/medicines.html`, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  try {
    const input = await page.$('#medicineQueryInput, input[placeholder*="medicine"], input[placeholder*="Medicine"]');
    if (input) {
      await input.click();
      await sleep(300);
      await page.keyboard.type('Dolo 650', { delay: 80 });
      await sleep(600);
      const btn = await page.$('#searchDrugBtn, button[type="submit"], .search-btn');
      if (btn) await btn.click();
      await sleep(3000);
    }
  } catch (e) {}

  // ── Scene 6: OPD page (4s) ───────────────────────────────────────────────
  console.log('Scene 6: OPD timings...');
  await page.goto(`${BASE}/opd.html`, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  try {
    const input = await page.$('#opdSearch, input[placeholder*="hospital"], input[placeholder*="OPD"]');
    if (input) {
      await input.click();
      await sleep(300);
      await page.keyboard.type('AIIMS', { delay: 80 });
      await sleep(1500);
    }
  } catch (e) {}
  await sleep(500);

  // ── Scene 7: Hospitals page (3s) ─────────────────────────────────────────
  console.log('Scene 7: Hospital radar...');
  await page.goto(`${BASE}/hospitals.html`, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2500);

  // ── Scene 8: Toggle Dark Mode on homepage (4s) ───────────────────────────
  console.log('Scene 8: Dark mode toggle...');
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(1500);

  try {
    // Click Dark Mode toggle button
    const darkBtn = await page.$('button[onclick*="dark"], .theme-toggle, #themeToggle, button');
    if (darkBtn) {
      await darkBtn.hover();
      await sleep(400);
      await darkBtn.click();
      await sleep(2000);
    }
  } catch (e) {}

  // Final scroll on dark mode
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy(0, 150));
    await sleep(200);
  }
  await sleep(1500);

  // ── Stop recording ────────────────────────────────────────────────────────
  await recorder.stop();
  await browser.close();

  console.log('\n✅ Recording complete!');
  console.log(`📁 Saved to: ${OUT_FILE}`);
  console.log('\n📐 Specs: 1280×720 HD · WebM · ~40 seconds');
  console.log('💡 You can open this file directly in Chrome, Edge, or VLC.');
  console.log('💡 To convert to MP4: open in browser → Share → Download as MP4');
  console.log('   Or use an online converter like cloudconvert.com (free, no signup)');
}

record().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
