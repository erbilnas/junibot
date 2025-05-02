import axios from "axios";
import notifier from "node-notifier";
import { CALLMEBOT_API_KEY, TeslaCar, WHATSAPP_NUMBER } from "./config";
import { logger } from "./logger";

export async function sendWhatsAppMessage(message: string): Promise<void> {
  try {
    logger.debug("Preparing WhatsApp message...");
    const url: string = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      message
    )}&apikey=${CALLMEBOT_API_KEY}`;

    logger.debug("Sending WhatsApp message...");
    await axios.get(url);
    logger.success("WhatsApp message sent successfully");
  } catch (error) {
    logger.error(
      `Error sending WhatsApp message: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export function sendDesktopNotification(message: string): void {
  logger.debug("Preparing desktop notification...");
  notifier.notify({
    title: "Tesla Inventory Alert",
    message: message,
    sound: true,
    wait: true,
  });
  logger.success("Desktop notification sent successfully");
}

export function formatCarMessage(cars: TeslaCar[]): string {
  logger.debug("Formatting car message...");
  return `🚗 Tesla Cars Available!\n\n${cars
    .map(
      (car) =>
        `Model: ${car.model}\n` +
        `Name: ${car.name}\n` +
        `Price: ${car.price}\n` +
        `Options: ${car.options}\n` +
        `Details: ${car.detailLink}\n` +
        `-------------------`
    )
    .join("\n")}`;
}
