/**
 * MediGuide LinkedIn Screenshot Capture Script
 * Uses Puppeteer with the user's installed Chrome to capture
 * high-quality screenshots of all key pages.
 *
 * Run: node assets/screenshots/capture.mjs
 */

import puppeteer from 'puppeteer';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://mediguide-xi.vercel.app';

const SHOTS = [
  {
    id: '01_homepage_desktop',
    url: `${BASE}/index.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Homepage – full desktop hero with feature cards',
  },
  {
    id: '02_homepage_mobile',
    url: `${BASE}/index.html`,
    viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    desc: 'Homepage – iPhone 14 Pro mobile view',
  },
  {
    id: '03_medicines_search',
    url: `${BASE}/medicines.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Jan Aushadhi Medicine page ready for search',
    action: async (page) => {
      try {
        await page.type('#medicineQueryInput', 'Dolo 650');
        await page.click('#searchDrugBtn');
        await sleep(2800);
      } catch (e) { /* selector may differ */ }
    }
  },
  {
    id: '04_opd_aiims',
    url: `${BASE}/opd.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'OPD Timings page – AIIMS loaded',
    action: async (page) => {
      try {
        await page.waitForSelector('#opdSearch', { timeout: 5000 });
        await page.type('#opdSearch', 'AIIMS');
        await sleep(1200);
      } catch (e) { /* selector may differ */ }
    }
  },
  {
    id: '05_emergency_page',
    url: `${BASE}/emergency.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Emergency SOS 108 hub with pulsing beacon',
  },
  {
    id: '06_symptoms_triage',
    url: `${BASE}/symptoms.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Symptom Triage AI input desk',
  },
  {
    id: '07_hospitals_map',
    url: `${BASE}/hospitals.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Hospital radar & map finder',
  },
  {
    id: '08_login_page',
    url: `${BASE}/login.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Role-locked auth portal',
  },
  {
    id: '09_dark_mode_home',
    url: `${BASE}/index.html`,
    viewport: { width: 1280, height: 820, deviceScaleFactor: 2 },
    desc: 'Homepage in Dark Mode',
    darkMode: true,
  },
  {
    id: '10_medicines_mobile',
    url: `${BASE}/medicines.html`,
    viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    desc: 'Medicines page on mobile',
    action: async (page) => {
      try {
        await page.type('#medicineQueryInput', 'Pan 40');
        await page.click('#searchDrugBtn');
        await sleep(2800);
      } catch (e) { /* selector may differ */ }
    }
  },
];

async function capture() {
  console.log('🚀 Launching browser...\n');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  for (const shot of SHOTS) {
    const page = await browser.newPage();

    await page.setViewport({
      width: shot.viewport.width,
      height: shot.viewport.height,
      deviceScaleFactor: shot.viewport.deviceScaleFactor || 2,
      isMobile: shot.viewport.isMobile || false,
      hasTouch: shot.viewport.hasTouch || false,
    });

    console.log(`📸 Capturing: ${shot.id}`);
    console.log(`   URL: ${shot.url}`);

    // Pre-set dark theme via evaluateOnNewDocument before navigation
    if (shot.darkMode) {
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem('mediguide_theme', 'dark');
      });
    }

    await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(async () => {
      await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    });

    // Apply dark mode attributes after load
    if (shot.darkMode) {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body && document.body.setAttribute('data-theme', 'dark');
      });
      await sleep(600);
    }

    // Run any page-specific actions
    if (shot.action) {
      try {
        await shot.action(page);
      } catch (e) {
        console.log(`   ⚠️  Action skipped: ${e.message}`);
      }
    }

    // Small settle delay for animations
    await sleep(800);

    const outPath = join(OUT_DIR, `${shot.id}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`   ✅ Saved → ${outPath}\n`);

    await page.close();
  }

  await browser.close();
  console.log('🎉 All screenshots captured! Check assets/screenshots/');
  console.log('\nFiles ready to upload to LinkedIn:');
  SHOTS.forEach(s => console.log(`  📷 ${s.id}.png — ${s.desc}`));
}

capture().catch(err => {
  console.error('❌ Error:', err.message);
  console.log('\n💡 If puppeteer is not installed, run: npm install puppeteer');
  process.exit(1);
});
