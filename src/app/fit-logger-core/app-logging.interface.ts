import { ApplicationLogger } from './app.logger';
import { LoggerStaticInfo, LogOptions, LogLevel } from './logging.models';

export abstract class ApplicationLoggingService {
      abstract init(loggerStaticInfo: LoggerStaticInfo, options?: LogOptions): void;
      abstract getLogger(name: string, level?: LogLevel): ApplicationLogger;
}