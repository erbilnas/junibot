export function getRandomDelay(): number {
  return Math.floor(Math.random() * 3000) + 2000; // Random delay between 2-5 seconds
}

export function getRandomUserAgent(userAgents: string[]): string {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}
