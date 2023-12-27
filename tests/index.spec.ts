import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Search input", async ({ page, baseURL }) => {
    const input = page.getByTestId("subreddit-input");

    await input.fill("pics");
    await page.keyboard.press("Enter");

    expect(input).toHaveValue("pics");
    expect(page).toHaveURL(`${baseURL}/r/pics/hot`);
  });

  test("Time menu", async ({ page }) => {
    await page.click('[data-testid="sort-top-link"]');

    const button = page.getByTestId("time-popover-button");

    expect(button).toBeVisible();
  });

  test("Time menu - hour", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);

    await page.click("[data-testid=time-popover-panel-link-hour]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=hour`);
  });

  test("Time menu - day", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);

    await page.click("[data-testid=time-popover-panel-link-day]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=day`);
  });

  test("Time menu - week", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=week`);

    await page.click("[data-testid=time-popover-panel-link-week]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=week`);
  });

  test("Time menu - month", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=month`);

    await page.click("[data-testid=time-popover-panel-link-month]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=month`);
  });

  test("Time menu - year", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=year`);

    await page.click("[data-testid=time-popover-panel-link-year]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=year`);
  });

  test("Time menu - all", async ({ page, baseURL }) => {
    await page.click("[data-testid=sort-top-link]");
    await page.click("[data-testid=time-popover-button]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=all`);

    await page.click("[data-testid=time-popover-panel-link-all]");

    expect(page).toHaveURL(`${baseURL}/r/Art/top?t=all`);
  });

  test("Go to first post", async ({ page, baseURL }) => {
    const link = await page
      .locator("[data-testid=post]")
      .first()
      .getAttribute("href");

    await page.locator("[data-testid=post]").first().click();

    expect(page).toHaveURL(`${baseURL}${link}`);
  });

  test("Go to last post", async ({ page, baseURL }) => {
    const link = await page
      .locator("[data-testid=post]")
      .last()
      .getAttribute("href");

    await page.locator("[data-testid=post]").last().click();

    expect(page).toHaveURL(`${baseURL}${link}`);
  });

  test("Post - x icon", async ({ page, baseURL }) => {
    await page.locator("[data-testid=post]").first().click();
    await page.click("[data-testid=x-icon]");

    expect(page).toHaveURL(`${baseURL}/`);
  });

  test("Post - escape key", async ({ page, baseURL }) => {
    const link = await page
      .locator("[data-testid=post]")
      .first()
      .getAttribute("href");

    await page.locator("[data-testid=post]").first().click();

    expect(page).toHaveURL(`${baseURL}${link}`);

    await page.keyboard.press("Escape");

    expect(page).toHaveURL(`${baseURL}/`);
  });
});
