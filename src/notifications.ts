import axios from "axios";
import notifier from "node-notifier";
import { CALLMEBOT_API_KEY, TeslaCar, WHATSAPP_NUMBER } from "./config";

export async function sendWhatsAppMessage(message: string): Promise<void> {
  try {
    const url: string = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      message
    )}&apikey=${CALLMEBOT_API_KEY}`;
    await axios.get(url);
    console.log("WhatsApp message sent successfully");
  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}

export function sendDesktopNotification(message: string): void {
  notifier.notify({
    title: "Tesla Inventory Alert",
    message: message,
    sound: true,
    wait: true,
  });
}

export function formatCarMessage(cars: TeslaCar[]): string {
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
