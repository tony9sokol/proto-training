import { test, expect } from "@playwright/test";

test("Navbar navigates to Employees page", async ({ page }) => {
  await page.goto("/"); 
  await expect(page.locator("nav.navbar")).toBeVisible();

  await page.getByRole("link", { name: "Employees" }).click();

  await expect(page).toHaveURL(/\/employees$/);

  await expect(page.locator(".MuiCard-root").first()).toBeVisible();
});
