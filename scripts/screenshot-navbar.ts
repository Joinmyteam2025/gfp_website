import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  const appUrl = process.env.APP_URL || "http://localhost:4173";
  await page.goto(appUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  
  // Hover over Login dropdown
  const loginButton = page.locator('button:has-text("Login")');
  await loginButton.hover();
  await page.waitForTimeout(800);
  
  // Take screenshot
  await page.screenshot({ path: "screenshots/navbar-dropdown.png", fullPage: false });
  console.log("✅ Screenshot saved to screenshots/navbar-dropdown.png");
  
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
