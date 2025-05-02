import chalk from "chalk";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export class Logger {
  private static instance: Logger;
  private isDebugEnabled: boolean;

  private constructor() {
    this.isDebugEnabled = process.env.DEBUG === "true";
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.getTimestamp();
    const emoji = this.getEmoji(level);
    const color = this.getColor(level);
    return `${color(`[${timestamp}] ${emoji} [${level}] ${message}`)}`;
  }

  private getEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return "🔍";
      case LogLevel.INFO:
        return "ℹ️";
      case LogLevel.SUCCESS:
        return "✅";
      case LogLevel.WARNING:
        return "⚠️";
      case LogLevel.ERROR:
        return "❌";
    }
  }

  private getColor(level: LogLevel): (text: string) => string {
    switch (level) {
      case LogLevel.DEBUG:
        return chalk.gray;
      case LogLevel.INFO:
        return chalk.blue;
      case LogLevel.SUCCESS:
        return chalk.green;
      case LogLevel.WARNING:
        return chalk.yellow;
      case LogLevel.ERROR:
        return chalk.red;
    }
  }

  public debug(message: string): void {
    if (this.isDebugEnabled) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  public info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  public success(message: string): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message));
  }

  public warning(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARNING, message));
  }

  public error(message: string): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
  }
}

// Export a singleton instance
export const logger = Logger.getInstance();
