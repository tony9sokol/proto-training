import { test, expect } from "@playwright/test";

test("Map shows at least one marker with a popup", async ({ page }) => {
  await page.goto("http://localhost:5173/map");

  // Wait for markers to exist
  const markers = page.locator(".leaflet-marker-icon");
  await expect(markers.first()).toBeVisible();

  // Click the first marker using page.evaluate
  await page.evaluate(() => {
    const marker = document.querySelector(
      ".leaflet-marker-icon"
    ) as HTMLElement;
    if (marker) marker.click();
  });

  // Check that popup appears
  const popup = page.locator(".leaflet-popup-content");
  await expect(popup).toBeVisible();
  await expect(popup).toContainText(/USA|UK/);
});
