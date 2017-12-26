import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LoggingEvent } from '../models/log-event';
import { Appender } from '../appenders/appender';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/interval';


export abstract class LogWriter {
      protected appenders: Map<string, Appender> = new Map();
      abstract addLogEntry(logEvent: LoggingEvent): void;
      addAppender(appender: Appender): void {
            if (!this.appenders.has(appender.name)) {
                  this.appenders.set(appender.name, appender);
            }
      }
      static getImmediateLogWriter(): LogWriter {
            return new ImmediateLogWriter();
      }
      static getDefferredWriter(delay: number): LogWriter {
            return new DefferredLogger(delay);
      }
}

class ImmediateLogWriter extends LogWriter {

      constructor() {
            super();
      }

      addLogEntry(logEvent: LoggingEvent): void {
            this.appenders.forEach((appender, key) => {
                  appender.writeLog(logEvent);
            });
      }
}

class DefferredLogger extends LogWriter {
      private logEvents: LoggingEvent[] = [];
      private subscription: Subscription;

      constructor(private delay: number) {
            super();
            Observable.interval(delay)
                  .filter(() => this.logEvents.length > 0)
                  .subscribe(this.writeEvents.bind(this));
      }
      addLogEntry(logEvent: LoggingEvent): void {

            this.logEvents.push(logEvent);
      }
      private writeEvents() {
            this.appenders.forEach((appender, key) => {
                  appender.writeLogs(this.logEvents);
                  this.logEvents = [];
            });
      }
}
