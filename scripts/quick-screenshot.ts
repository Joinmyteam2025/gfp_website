import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMP_DIR = join(__dirname, "..", "tmp");

const BASE_URL = process.env.APP_URL || "http://localhost:4174";

async function main() {
  await mkdir(TMP_DIR, { recursive: true });
  
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const pages = [
    { path: "/ffp", name: "ffp-page" },
    { path: "/bfp", name: "bfp-page" },
    { path: "/mfp", name: "mfp-page" },
  ];

  for (const { path, name } of pages) {
    const page = await context.newPage();
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Hero screenshot
    const heroPath = join(TMP_DIR, `${name}-hero.png`);
    await page.screenshot({ path: heroPath });
    console.log(`📸 Hero: ${heroPath}`);
    
    // Full page
    const fullPath = join(TMP_DIR, `${name}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`📸 Full: ${fullPath}`);

    // Scroll to value stack  
    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const valueHeading = headings.find(h => h.textContent?.includes('Everything You Get'));
      if (valueHeading) {
        valueHeading.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
    await page.waitForTimeout(500);
    const valuePath = join(TMP_DIR, `${name}-value.png`);
    await page.screenshot({ path: valuePath });
    console.log(`📸 Value: ${valuePath}`);

    await page.close();
  }

  await browser.close();
  console.log("\n✅ All screenshots taken!");
}

main().catch(err => { console.error("Failed:", err); process.exit(1); });
