import { test, expect } from "@playwright/test";

test("Employees page loads and shows cards", async ({ page }) => {
  // Go to Employees page
  await page.goto("http://localhost:5173/employees");

  // Wait until at least one card is visible
  const firstCard = page.locator(".MuiCard-root").first();
  await expect(firstCard).toBeVisible();

  // Check the image inside the card
  const firstImage = firstCard.locator("img");
  await expect(firstImage).toBeVisible();

  // Check that name, title, and city/country exist
  const name = firstCard.locator("h6");
  const details = firstCard.locator(".MuiTypography-body2");
  await expect(name).toBeVisible();
  await expect(details.first()).toBeVisible();
});
