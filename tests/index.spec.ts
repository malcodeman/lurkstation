import {
  DEFAULT_SORT,
  DEFAULT_SUBREDDIT,
  REDDIT_API,
} from "@/app/_lib/constants";
import { parsePost, parsePosts } from "@/app/_lib/utils";
import { test, expect } from "@playwright/test";
import { dropLast, length, map } from "ramda";

const PAINTING_POST_URL =
  "/r/painting/comments/16yw2ld/my_72yr_old_mothers_painting_of_her_life_as_a";
const DEFAULT_REDDIT_API_URL = `${REDDIT_API}/r/${DEFAULT_SUBREDDIT}/${DEFAULT_SORT}.json?t=&raw_json=1`;

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Search input", async ({ page, baseURL }) => {
    const input = page.getByTestId("search-input");

    await input.fill("pics");
    await page.keyboard.press("Enter");
    await expect(input).toHaveValue("pics");
    await expect(page).toHaveURL(`${baseURL}/r/pics/hot`);
  });

  test("Time menu", async ({ page }) => {
    await page.click('[data-testid="sort-top-link"]');
    await expect(page.getByTestId("time-popover-button")).toBeVisible();
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

  test.skip("Go to first post", async ({ page, baseURL }) => {
    const responsePromise = page.waitForResponse(DEFAULT_REDDIT_API_URL);
    const response = await responsePromise;
    const body = await response.json();
    const filtered = parsePosts(body.data.children);
    const posts = map((item) => parsePost(item), filtered);
    const permalink = dropLast(1, posts[0].data.permalink);

    await page.locator("[data-testid=post]").first().click();
    await expect(page).toHaveURL(`${baseURL}${permalink}`);
  });

  test.skip("Go to last post", async ({ page, baseURL }) => {
    const responsePromise = page.waitForResponse(DEFAULT_REDDIT_API_URL);
    const response = await responsePromise;
    const body = await response.json();
    const filtered = parsePosts(body.data.children);
    const posts = map((item) => parsePost(item), filtered);
    const permalink = dropLast(1, posts[length(posts) - 1].data.permalink);

    await page.locator("[data-testid=post]").last().click();
    await expect(page).toHaveURL(`${baseURL}${permalink}`);
  });

  test.skip("Post - x icon", async ({ page, baseURL }) => {
    await page.goto(PAINTING_POST_URL);
    await page.click("[data-testid=x-icon]");
    await expect(page).toHaveURL(`${baseURL}/`);
  });

  test.skip("Post - escape key", async ({ page, baseURL }) => {
    await page.goto(PAINTING_POST_URL);
    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(`${baseURL}/`);
  });
});
