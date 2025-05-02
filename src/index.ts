import chalk from "chalk";
import { Browser } from "puppeteer";
import { createBrowser, setupPage } from "./browser";
import { logger } from "./logger";
import {
  formatCarMessage,
  sendDesktopNotification,
  sendWhatsAppMessage,
} from "./notifications";
import { scrapeTeslaInventory } from "./scraper";

async function checkTeslaInventory(): Promise<void> {
  logger.info("Starting Tesla inventory check...");
  logger.debug("Launching browser...");
  const browser: Browser = await createBrowser();

  try {
    const page = await browser.newPage();
    await setupPage(page);

    logger.info("Scraping Tesla inventory...");
    const availableCars = await scrapeTeslaInventory(page);

    if (availableCars.length > 0) {
      logger.success(`Found ${availableCars.length} available cars!`);
      const message = formatCarMessage(availableCars);

      logger.info("Sending desktop notification...");
      sendDesktopNotification(message);

      logger.info("Sending WhatsApp message...");
      await sendWhatsAppMessage(message);

      logger.success("All notifications sent successfully!");
      console.log(chalk.yellow(message));
    } else {
      logger.info("No cars available at the moment.");
    }
  } catch (error) {
    logger.error(
      `Error occurred: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    logger.debug("Closing browser...");
    await browser.close();
    logger.info("Tesla inventory check completed.");
  }
}

// Run the check immediately
logger.info("Starting Tesla inventory monitoring service...");
checkTeslaInventory();

// Set up periodic checks (every 15 seconds)
setInterval(checkTeslaInventory, 15 * 1000);
logger.info("Periodic checks configured to run every 15 seconds.");
