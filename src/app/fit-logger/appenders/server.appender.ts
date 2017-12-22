import { LoggingEvent } from '../models/log-event';
import { AppenderOptions } from '../../fit-logger-core/index';
import { Appender } from './appender';


export class ServerAppender implements Appender {

      constructor(private options: AppenderOptions) {
      }
      get name(): string {
            return 'ajax';
      }
      writeLog(loggingEvent: LoggingEvent): void {
            console.info(JSON.stringify(loggingEvent))
      }
      writeLogs(loggingEvent: LoggingEvent[]): void {
            console.info(JSON.stringify(loggingEvent))
      }
      update(appenderOptions: AppenderOptions) : void {
        this.options = appenderOptions;
      }
}
