import { Page } from "puppeteer";
import { humanScroll, simulatePageInteractions } from "./browser";
import { TESLA_URL, TeslaCar } from "./config";
import { getRandomDelay } from "./utils";

export async function scrapeTeslaInventory(page: Page): Promise<TeslaCar[]> {
  console.log("Navigating to Tesla inventory page...");
  await page.goto(TESLA_URL, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  // Add random delay after page load
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

  // Simulate human-like behavior
  console.log("Simulating human-like behavior...");
  await humanScroll(page);
  await simulatePageInteractions(page);
  await humanScroll(page);

  // Wait for the page to load and check for any inventory items
  await page.waitForSelector("body", { timeout: 10000 });

  // Check if there are any available cars using multiple possible selectors
  return await page.evaluate(() => {
    const selectors: string[] = [
      ".inventory-item",
      ".result-item",
      ".vehicle-card",
      "[data-test='inventory-item']",
    ];

    for (const selector of selectors) {
      const cars = document.querySelectorAll(selector);
      if (cars.length > 0) {
        return Array.from(cars).map((car): TeslaCar => {
          const model =
            car
              .querySelector(".model, [data-test='model']")
              ?.textContent?.trim() || "Unknown Model";
          const name =
            car
              .querySelector(".name, [data-test='name']")
              ?.textContent?.trim() || "Unknown Name";
          const price =
            car
              .querySelector(".price, [data-test='price']")
              ?.textContent?.trim() || "Price not available";
          const options =
            car
              .querySelector(".options, [data-test='options']")
              ?.textContent?.trim() || "No options listed";
          const detailLink =
            (car.querySelector("a[href*='/inventory/']") as HTMLAnchorElement)
              ?.href || "No link available";
          return { model, name, price, options, detailLink };
        });
      }
    }
    return [];
  });
}
