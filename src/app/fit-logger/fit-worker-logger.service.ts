import { LoggerStaticInfo, LogOptions, LogLevel } from "../fit-logger-core/logging.models";
import { LoggingController } from "./logwriters/logging.controller";
import { ApplicationLogger } from "../fit-logger-core/index";
import { Logger } from "./logwriters/app.logger";

// import { Logger } from './../logwriters/app.logger';
// import { LogLevel, ApplicationLogger } from '../fit-logger-core/index';




export class FitWorkerLoggerService {
  private static _instance = new FitWorkerLoggerService();

  constructor() {
    if (FitWorkerLoggerService._instance) {
      throw new Error("Error: Instantiation failed: Use FitWorkerLoggerService.instance instead of new.");
    }
    FitWorkerLoggerService._instance = this;
  }
  public init(loggerStaticInfo: LoggerStaticInfo, options?: LogOptions) {
    LoggingController.instance.initialize(loggerStaticInfo,options);
  }
  getLogger(name: string, level?: LogLevel) : ApplicationLogger {
    return new Logger(name, level);
  }

  static get instance(): FitWorkerLoggerService {
    return FitWorkerLoggerService._instance;
  }

}
