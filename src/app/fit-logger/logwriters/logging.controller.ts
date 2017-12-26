import { AppenderRepository, Appender } from '../appenders/index';
import { LogLevel, LogOptions, LoggerStaticInfo } from "../../fit-logger-core/index";
import { LoggingEvent } from '../models/log-event';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import { Subscription } from "rxjs/Subscription";
import { LogWriter } from './log.writer';


export class LoggingController {
      private static _instance = new LoggingController();
      private immedWriter = LogWriter.getImmediateLogWriter();
      private defLogWriter: LogWriter;
      private _staticInfo: LoggerStaticInfo = { appName: "" };
      private _logOptions: LogOptions;

      constructor() {
            if (LoggingController._instance) {
                  throw new Error("Error: Instantiation failed: Use LoggingStore.instance instead of new.");
            }
            LoggingController._instance = this;
      }

      public initialize(loggerStaticInfo: LoggerStaticInfo, options?: LogOptions) {
            this.resolveStaticInfo(loggerStaticInfo);
            this._logOptions = options || this._logOptions || this.getDefaultOptions();
            this._logOptions.appenders.forEach(appenderOptions => {
                  if (appenderOptions.isDefferred) {
                        const appender = AppenderRepository.instance.getAppender(appenderOptions.name);
                        const delay = this._logOptions.logInterval || 10000;
                        this.defLogWriter = this.defLogWriter || LogWriter.getDefferredWriter(delay);
                        appender.update(appenderOptions);
                        this.defLogWriter.addAppender(appender);
                  } else {
                        const appender = AppenderRepository.instance.getAppender(appenderOptions.name);
                        appender.update(appenderOptions);
                        this.immedWriter.addAppender(appender);
                  }
            });

      }
      public enqueue(logEvent: LoggingEvent): void {
            logEvent.appName = this._staticInfo.appName;
            logEvent.user = this._staticInfo.user;
            logEvent.region = this._staticInfo.region;
            logEvent.env = this._staticInfo.env;

            this.immedWriter.addLogEntry(logEvent);
            if (this.defLogWriter) {
                  this.defLogWriter.addLogEntry(logEvent);
            }
      }

      private resolveStaticInfo(staticInfo: LoggerStaticInfo) {
            this._staticInfo.appName = this._staticInfo.appName || staticInfo.appName;
            this._staticInfo.user = this._staticInfo.user || staticInfo.user;
            this._staticInfo.env = this._staticInfo.env || staticInfo.env;
            this._staticInfo.region = this._staticInfo.region || staticInfo.region;
      }
      private getDefaultOptions(): LogOptions {
            return {
                  appLogLevel: LogLevel.ALL,
                  logInterval: 10000,
                  appenders: [{
                        name: 'console',
                        format: 'text',
                        logLevel: LogLevel.ALL
                  }]
            };
      }
      static get instance(): LoggingController {
            return LoggingController._instance;
      }
}
