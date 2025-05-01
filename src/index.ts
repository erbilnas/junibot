import { Browser } from "puppeteer";
import { createBrowser, setupPage } from "./browser";
import {
  formatCarMessage,
  sendDesktopNotification,
  sendWhatsAppMessage,
} from "./notifications";
import { scrapeTeslaInventory } from "./scraper";

async function checkTeslaInventory(): Promise<void> {
  console.log("Launching browser...");
  const browser: Browser = await createBrowser();

  try {
    const page = await browser.newPage();
    await setupPage(page);

    const availableCars = await scrapeTeslaInventory(page);

    if (availableCars.length > 0) {
      console.log("Cars available!");
      const message = formatCarMessage(availableCars);

      // Send desktop notification
      sendDesktopNotification(message);

      // Send WhatsApp message
      await sendWhatsAppMessage(message);

      console.log(message);
    } else {
      console.log("No cars available at the moment.");
    }
  } catch (error) {
    console.error(
      "Error occurred:",
      error instanceof Error ? error.message : "Unknown error"
    );
    // Send error notification
    await sendWhatsAppMessage(
      `⚠️ Error checking Tesla inventory: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    await browser.close();
  }
}

// Run the check immediately
checkTeslaInventory();

// Set up periodic checks (every 15 seconds)
setInterval(checkTeslaInventory, 15 * 1000);
