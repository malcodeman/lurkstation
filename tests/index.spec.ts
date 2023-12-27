import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Search input", async ({ page, baseURL }) => {
    await page.waitForResponse("**/api/Art/hot");

    const input = page.getByTestId("subreddit-input");

    await input.fill("pics");
    await page.keyboard.press("Enter");
    await expect(input).toHaveValue("pics");
    await expect(page).toHaveURL(`${baseURL}/r/pics/hot`);
  });

  test("Time menu", async ({ page }) => {
    await page.click('[data-testid="sort-top-link"]');

    const button = page.getByTestId("time-popover-button");

    await expect(button).toBeVisible();
  });

  test("Time menu - hour", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
    await page.click("[data-testid=time-popover-panel-link-hour]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=hour`);
  });

  test("Time menu - day", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
    await page.click("[data-testid=time-popover-panel-link-day]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
  });

  test("Time menu - week", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
    await page.click("[data-testid=time-popover-panel-link-week]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=week`);
  });

  test("Time menu - month", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
    await page.click("[data-testid=time-popover-panel-link-month]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=month`);
  });

  test("Time menu - year", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
    await page.click("[data-testid=time-popover-panel-link-year]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=year`);
  });

  test("Time menu - all", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
    await page.click("[data-testid=time-popover-panel-link-all]");
    await expect(page).toHaveURL(`${baseURL}/r/Art/top?t=all`);
  });

  test("Go to first post", async ({ page, baseURL }) => {
    const link = await page
      .locator("[data-testid=post]")
      .first()
      .getAttribute("href");

    await page.locator("[data-testid=post]").first().click();
    await expect(page).toHaveURL(`${baseURL}${link}`);
  });

  test("Go to last post", async ({ page, baseURL }) => {
    const link = await page
      .locator("[data-testid=post]")
      .last()
      .getAttribute("href");

    await page.locator("[data-testid=post]").last().click();
    await expect(page).toHaveURL(`${baseURL}${link}`);
  });

  test("Post - x icon", async ({ page, baseURL }) => {
    await page.locator("[data-testid=post]").first().click();
    await page.click("[data-testid=x-icon]");
    await expect(page).toHaveURL(`${baseURL}/`);
  });

  test("Post - escape key", async ({ page, baseURL }) => {
    const link = await page
      .locator("[data-testid=post]")
      .first()
      .getAttribute("href");

    await page.locator("[data-testid=post]").first().click();
    await expect(page).toHaveURL(`${baseURL}${link}`);
    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(`${baseURL}/`);
  });
});
