# Junibot - Tesla Inventory Monitor

Junibot is an automated monitoring tool that checks Tesla's inventory for available vehicles and sends notifications via WhatsApp and desktop alerts when new vehicles become available.

## Features

- 🔍 Real-time monitoring of Tesla's inventory
- 📱 WhatsApp notifications for new vehicle availability
- 💻 Desktop notifications with sound alerts
- 🤖 Stealth mode to avoid detection
- 🔄 Automatic periodic checks (every 15 seconds)
- 📊 Detailed vehicle information including model, name, price, and options
- 🐳 Docker support for easy deployment

## Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.9 or later)
- Node.js (for node-notifier)
- WhatsApp account for notifications
- CallMeBot API key (for WhatsApp integration)
- Docker (optional, for containerized deployment)

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

## Project Structure

```
junibot/
├── src/
│   ├── index.ts          # Main application entry point
│   ├── browser.ts        # Browser setup and configuration
│   ├── notifications.ts  # Notification handling
│   ├── scraper.ts        # Tesla inventory scraping logic
│   ├── utils.ts          # Utility functions
│   └── config.ts         # Configuration management
├── Dockerfile            # Docker configuration
├── .dockerignore         # Docker ignore file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## Configuration

Before running the bot, you need to configure the following environment variables:

- `TESLA_URL`: The Tesla inventory URL to monitor
- `CALLMEBOT_API_KEY`: Your CallMeBot API key
- `WHATSAPP_NUMBER`: Your WhatsApp number in international format

## Usage

### Running with Bun

To start the bot:

```bash
bun run start
```

### Running with Docker

1. Build the Docker image:

```bash
docker build -t junibot .
```

2. Run the container:

```bash
docker run -e TESLA_URL="your_url" \
           -e CALLMEBOT_API_KEY="your_key" \
           -e WHATSAPP_NUMBER="your_number" \
           junibot
```

The bot will:

1. Launch a browser in stealth mode
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
- TypeScript for type safety
- Bun as the JavaScript runtime
- Docker for containerization

## Security Features

- Random user agent rotation
- Random viewport sizes
- Random delays between actions
- Stealth mode enabled
- Anti-detection measures implemented

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are properly installed
2. Verify your CallMeBot API key is correct
3. Check your internet connection
4. Make sure your WhatsApp number is in the correct format
5. Check the console for error messages
6. For Docker issues, ensure the container has proper network access

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
