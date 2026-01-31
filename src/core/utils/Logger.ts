export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export enum LogCategory {
  SYSTEM = 'SYSTEM',
  VOTING = 'VOTING',
  API = 'API',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  event: string;
  socketId?: string;
  message?: string;
  metadata?: Record<string, any>;
  stack?: string;
}

export class Logger {
  static log(
    level: LogLevel,
    category: LogCategory,
    event: string,
    params: {
      socketId?: string;
      message?: string;
      metadata?: Record<string, any>;
      error?: Error;
    } = {}
  ) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      event,
      socketId: params.socketId,
      message: params.message || params.error?.message,
      metadata: params.metadata,
    };

    if (params.error && level === LogLevel.CRITICAL) {
      entry.stack = params.error.stack;
    }

    const output = JSON.stringify(entry);

    if (level === LogLevel.ERROR || level === LogLevel.CRITICAL) {
      console.error(output);
    } else {
      console.log(output);
    }
  }

  static info(category: LogCategory, event: string, params: any = {}) {
    this.log(LogLevel.INFO, category, event, params);
  }

  static warn(category: LogCategory, event: string, params: any = {}) {
    this.log(LogLevel.WARN, category, event, params);
  }

  static error(category: LogCategory, event: string, params: any = {}) {
    this.log(LogLevel.ERROR, category, event, params);
  }

  static critical(category: LogCategory, event: string, error: Error, params: any = {}) {
    this.log(LogLevel.CRITICAL, category, event, { ...params, error });
  }
}
