import { AppenderOptions, LogLevel } from '../../fit-logger-core/index';
import { Appender } from "./appender";
import { LoggingEvent } from "../models/log-event";



export class ConsoleAppender implements Appender {
      get name(): string {
            return 'console';
      }
      constructor(private options: AppenderOptions) {

      }

      writeLog(loggingEvent: LoggingEvent): void {
            if (this.options.logLevel !== LogLevel.OFF && loggingEvent.level >= this.options.logLevel) {
                  const message = this.getFormattedMessage(loggingEvent);
                  switch (loggingEvent.level) {
                        case LogLevel.DEBUG:
                              console.debug(message);
                              break;
                        case LogLevel.ERROR:
                        case LogLevel.FATAL:
                              console.error(message);
                              break;
                        case LogLevel.INFO:
                              console.info(message);
                              break;
                        default:
                              console.info(message);
                  }
            }
      }
      writeLogs(loggingEvent: LoggingEvent[]): void {

      }

      update(appenderOptions: AppenderOptions): void {
            this.options = appenderOptions;
      }

      private getFormattedMessage(loggingEvent: LoggingEvent): string {
            return `[${loggingEvent.appName}-${loggingEvent.name}-${this.getFormattedTime(loggingEvent.timestamp)}] [${LogLevel[loggingEvent.level]}] => ${loggingEvent.message}`;
      }
      private getFormattedTime(timestamp: number): string {
        const date = new Date(timestamp);
        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
      }
}
