
export enum LogLevel {
      ALL = 0,
      TRACE = 1,
      DEBUG = 2,
      INFO = 3,
      WARN = 4,
      ERROR = 5,
      FATAL = 6,
      OFF = 7
}
export interface LoggerStaticInfo {
      appName: string;
      user?: string;
      region?: string;
      env?: string;
}
export interface LogOptions {
      appLogLevel: LogLevel;
      forcedLogLevel?: LogLevel;
      logInterval: number;
      appenders: AppenderOptions[];
      logServer?: any;
}
export interface AppenderOptions {
      name: string;
      format: string; // Text, json
      pattern?: string;
      path?: string;
      logLevel?: LogLevel;
      isDefferred?: boolean;
}
