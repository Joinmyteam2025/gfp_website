import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Start the preview server
  const proc = Bun.spawn(["bun", "run", "preview"], {
    cwd: process.cwd(),
    stdout: "pipe",
    stderr: "pipe",
  });
  
  // Wait for server
  await new Promise(r => setTimeout(r, 3000));
  
  await page.goto("http://localhost:4173/services", { waitUntil: "networkidle" });
  await new Promise(r => setTimeout(r, 2000));
  
  // Screenshot the full page
  await page.screenshot({ path: "screenshots/services-full.png", fullPage: true });
  
  // Screenshot just the new University section (scroll to it)
  // First, get the position of the University section
  const uniSection = page.locator('text=Learn, Grow,');
  if (await uniSection.count() > 0) {
    await uniSection.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: "screenshots/services-university.png" });
  }
  
  // Screenshot the Fortress section for comparison
  const fortressSection = page.locator('text=Protect What');
  if (await fortressSection.count() > 0) {
    await fortressSection.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: "screenshots/services-fortress.png" });
  }
  
  proc.kill();
  await browser.close();
  console.log("Screenshots saved!");
}

main().catch(console.error);
