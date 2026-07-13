import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  
  const proc = Bun.spawn(["bun", "run", "preview"], {
    cwd: process.cwd(),
    stdout: "pipe",
    stderr: "pipe",
  });
  
  await new Promise(r => setTimeout(r, 3000));
  
  await page.goto("http://localhost:4173/services", { waitUntil: "networkidle" });
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll to the university cards area
  await page.evaluate(() => window.scrollTo(0, 500));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshots/services-uni-cards.png" });
  
  proc.kill();
  await browser.close();
  console.log("Done!");
}

main().catch(console.error);
