import { test, expect } from "@playwright/test";

test("Navbar navigates to Employees page", async ({ page }) => {
  // Go to the home page first
  await page.goto("http://localhost:5173/");

  // Find the 'Employees' link in the navbar and click it
  const employeesLink = page.locator("nav a", { hasText: "Employees" });
  await expect(employeesLink).toBeVisible();
  await employeesLink.click();

  // Wait for navigation
  await page.waitForURL("**/employees");

  // Check that the Employees page heading is visible
  const heading = page.locator("h2", { hasText: "Employees" });
  await expect(heading).toBeVisible();

  // Optional: check that at least one employee card exists
  const firstCard = page.locator(".MuiCard-root").first();
  await expect(firstCard).toBeVisible();
});
