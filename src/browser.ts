import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { USER_AGENTS } from "./config";
import { getRandomUserAgent } from "./utils";

// Add stealth plugin with additional options
puppeteer.use(
  StealthPlugin({
    enabledEvasions: new Set([
      "chrome.runtime",
      "iframe.contentWindow",
      "media.codecs",
      "navigator.languages",
      "navigator.permissions",
      "navigator.plugins",
      "navigator.webdriver",
      "sourceurl",
      "user-agent-override",
      "webgl.vendor",
      "window.outerdimensions",
    ]),
  })
);

export async function createBrowser(): Promise<Browser> {
  return await puppeteer.launch({
    headless: true,
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
      "--window-position=0,0",
      "--ignore-certifcate-errors",
      "--ignore-certifcate-errors-spki-list",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  });
}

export async function setupPage(page: Page): Promise<void> {
  // Set random viewport size within realistic ranges
  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 1080 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: true,
  });

  // Set random user agent
  await page.setUserAgent(getRandomUserAgent(USER_AGENTS));

  // Set additional headers
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Cache-Control": "max-age=0",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
  });

  // Add more realistic browser properties
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    Object.defineProperty(navigator, "plugins", {
      get: () => [
        {
          0: {
            type: "application/x-google-chrome-pdf",
            suffixes: "pdf",
            description: "Portable Document Format",
            enabledPlugin: true,
          },
          description: "Portable Document Format",
          filename: "internal-pdf-viewer",
          length: 1,
          name: "Chrome PDF Plugin",
        },
      ],
    });
    Object.defineProperty(navigator, "languages", {
      get: () => ["en-US", "en"],
    });
    Object.defineProperty(navigator, "platform", { get: () => "MacIntel" });
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 });
    Object.defineProperty(navigator, "deviceMemory", { get: () => 8 });
  });
}

export async function moveMouse(
  page: Page,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): Promise<void> {
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const x = startX + (endX - startX) * (i / steps);
    const y = startY + (endY - startY) * (i / steps);
    await page.mouse.move(x, y);
    await new Promise((resolve) =>
      setTimeout(resolve, 50 + Math.random() * 50)
    );
  }
}

export async function humanScroll(page: Page): Promise<void> {
  const viewport = await page.viewport();
  if (!viewport) return;

  const maxScroll = await page.evaluate(
    () => document.body.scrollHeight - window.innerHeight
  );
  const scrollSteps = Math.floor(Math.random() * 3) + 2;

  for (let i = 0; i < scrollSteps; i++) {
    const scrollAmount = Math.floor((Math.random() * maxScroll) / scrollSteps);
    await page.evaluate((amount) => {
      window.scrollBy({
        top: amount,
        behavior: "smooth",
      });
    }, scrollAmount);
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );
  }
}

export async function simulatePageInteractions(page: Page): Promise<void> {
  const viewport = await page.viewport();
  if (!viewport) return;

  const clickCount = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < clickCount; i++) {
    const x = Math.floor(Math.random() * viewport.width);
    const y = Math.floor(Math.random() * viewport.height);

    await moveMouse(
      page,
      Math.floor(Math.random() * viewport.width),
      Math.floor(Math.random() * viewport.height),
      x,
      y
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 1000)
    );
    await page.mouse.move(x, y);
    await page.mouse.down();
    await new Promise((resolve) =>
      setTimeout(resolve, 100 + Math.random() * 200)
    );
    await page.mouse.up();
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );
  }
}
