import { ApplicationLogger, LogLevel } from '../../fit-logger-core/index';
import { LoggingEvent } from '../models/log-event';
import { LoggingController } from '../logwriters/logging.controller';


export class Logger implements ApplicationLogger {
  private moduleLogLevel: LogLevel;
  private timer = new Map<string, number>();

  constructor(private loggerName: string, private level?: LogLevel) {
    this.moduleLogLevel = level ? level : LogLevel.ALL;
  }

  log(level: LogLevel, params: any[]): void {
    if (level >= this.moduleLogLevel) {
      this.buildLoggingEvent(level, params);
    }
  }
  trace(...messages: any[]): void {
    if (this.moduleLogLevel >= LogLevel.TRACE) {
      this.buildLoggingEvent(LogLevel.TRACE, messages);
    }
  }
  debug(...messages: any[]): void {
    if (LogLevel.DEBUG >= this.moduleLogLevel) {
      this.buildLoggingEvent(LogLevel.DEBUG, messages);
    }
  }
  info(...messages: any[]): void {
    if (LogLevel.INFO >= this.moduleLogLevel) {
      this.buildLoggingEvent(LogLevel.INFO, messages);
    }
  }
  warn(...messages: any[]): void {
    if (LogLevel.WARN >= this.moduleLogLevel) {
      this.buildLoggingEvent(LogLevel.WARN, messages);
    }
  }
  error(...messages: any[]): void {
    if (LogLevel.ERROR >= this.moduleLogLevel) {
      this.buildLoggingEvent(LogLevel.ERROR, messages);
    }
  }
  fatal(...messages: any[]): void {
    if (LogLevel.FATAL >= this.moduleLogLevel) {
      this.buildLoggingEvent(LogLevel.FATAL, messages);
    }
  }
  group(name: string, initiallyExpanded?: boolean): void {
    // this.buildLoggingEvent(LogLevel.TRACE,undefined,messages);
  }
  groupEnd(): void {
    // this.buildLoggingEvent(LogLevel.TRACE,undefined,messages);
  }
  time(name: string, level?: LogLevel): void {
    if (LogLevel.INFO >= this.moduleLogLevel) {
      if (!this.timer.has(name)) {
        this.timer.set(name, Date.now());
      }
    }
  }
  timeEnd(name: string): void {
    if (LogLevel.INFO >= this.moduleLogLevel) {
      const startTime = this.timer.get(name);
      const message = `Time taken by [${name}] : ${(Date.now()-startTime)/1000} seconds`;
      this.timer.delete(name);
      this.buildLoggingEvent(LogLevel.INFO,  [message]);
    }
  }
  assert(expr: any): void {
    // this.buildLoggingEvent(LogLevel.TRACE,undefined,messages);
  }
  get name(): string {
    return this.loggerName;
  }


  private buildLoggingEvent(level: LogLevel, messages: any[]) {
    const loggingEvent = new LoggingEvent();
    loggingEvent.name = this.name;
    loggingEvent.level = level;
    loggingEvent.timestamp = Date.now();
    loggingEvent.message = this.buildMessage(messages);
    LoggingController.instance.enqueue(loggingEvent);
  }
  private buildMessage(messages: any[]): string {
    let message = "";
    messages.forEach(msg=> {
      if(msg instanceof  Error) {
        message += `${msg.stack}, `;
      } else if(typeof msg === "object") {
        message += `${JSON.stringify(msg)}, `;
      } else {
        message += `${msg}, `;
      }
    });
    return message.length > 0 ? message.slice(0,message.length-2) : "";
  }
}
