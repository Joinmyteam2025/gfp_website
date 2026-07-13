import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const base = "http://localhost:4199";
  
  const page = await ctx.newPage();
  
  // Services page top
  await page.goto(`${base}/services`, { waitUntil: "networkidle", timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshots/services-top.png" });
  console.log("✅ Services top");

  // Scroll to services grid (below fortress programs)
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(800);
  await page.screenshot({ path: "screenshots/services-grid.png" });
  console.log("✅ Services grid");
  
  // AI CRM page hero
  await page.goto(`${base}/ai-crm`, { waitUntil: "networkidle", timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshots/ai-crm-hero.png" });
  console.log("✅ AI CRM hero");
  
  // AI CRM pricing
  await page.evaluate(() => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "screenshots/ai-crm-pricing.png" });
  console.log("✅ AI CRM pricing");
  
  // Growth Partner hero
  await page.goto(`${base}/growth-partner`, { waitUntil: "networkidle", timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshots/growth-partner-hero.png" });
  console.log("✅ Growth Partner hero");
  
  // Growth Partner pricing
  await page.evaluate(() => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "screenshots/growth-partner-pricing.png" });
  console.log("✅ Growth Partner pricing");
  
  await browser.close();
  console.log("All screenshots done!");
}

main().catch(e => { console.error(e); process.exit(1); });
