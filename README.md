# Junibot - Tesla Inventory Monitor

Junibot is an automated monitoring tool that checks Tesla's inventory for available vehicles and sends notifications via WhatsApp and desktop alerts when new vehicles become available.

## Features

- 🔍 Real-time monitoring of Tesla's inventory
- 📱 WhatsApp notifications for new vehicle availability
- 💻 Desktop notifications with sound alerts
- 🤖 Stealth mode to avoid detection
- 🔄 Automatic periodic checks (every 15 seconds)
- 📊 Detailed vehicle information including model, name, price, and options

## Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.9 or later)
- Microsoft Edge browser installed (for Puppeteer)
- WhatsApp account for notifications
- CallMeBot API key (for WhatsApp integration)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/junibot.git
cd junibot
```

2. Install dependencies:

```bash
bun install
```

## Configuration

Before running the bot, you need to configure the following environment variables in the `index.ts` file:

- `TESLA_URL`: The Tesla inventory URL to monitor
- `CALLMEBOT_API_KEY`: Your CallMeBot API key
- `WHATSAPP_NUMBER`: Your WhatsApp number in international format

## Usage

To start the bot:

```bash
bun run index.ts
```

The bot will:

1. Launch a browser in non-headless mode
2. Navigate to the Tesla inventory page
3. Check for available vehicles
4. Send notifications if vehicles are found
5. Repeat the process every 15 seconds

## Technical Details

The bot uses:

- Puppeteer with stealth plugin for web scraping
- Node-notifier for desktop notifications
- CallMeBot API for WhatsApp integration
- Axios for HTTP requests

## Security Features

- Random user agent rotation
- Random viewport sizes
- Random delays between actions
- Stealth mode enabled
- Anti-detection measures implemented

## Troubleshooting

If you encounter any issues:

1. Ensure Microsoft Edge is installed
2. Verify your CallMeBot API key is correct
3. Check your internet connection
4. Make sure your WhatsApp number is in the correct format

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
