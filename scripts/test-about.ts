import { runTest } from "./auth";

runTest("About Page - Six Portals", async (helper) => {
  const { page } = helper;
  
  // Go to the about page
  await helper.goto("/about");
  await page.waitForTimeout(2000);
  
  // Scroll to the education platforms section
  const section = page.locator("text=Our Education Platforms").first();
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Take screenshot of the education platforms section
  await page.screenshot({ path: "screenshots/about-portals.png", fullPage: false });
  
  // Scroll down a bit more to capture all cards
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/about-portals-full.png", fullPage: false });
  
  // Verify all 6 portals are present
  const portalNames = ["Athlete U™", "Business U™", "Scripture U™", "Social Media U™", "Veteran U™", "Wealth U™"];
  for (const name of portalNames) {
    const el = page.locator(`text=${name}`).first();
    const visible = await el.isVisible();
    if (!visible) {
      throw new Error(`Portal "${name}" not found on page`);
    }
    console.log(`✅ Found: ${name}`);
  }
  
  console.log("All 6 portals present and verified!");
}).catch(() => process.exit(1));
