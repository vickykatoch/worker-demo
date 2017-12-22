import { LoggerFactory } from './factories/logger.factory';
import { Injectable } from '@angular/core';
import { ApplicationLoggingService, LoggerStaticInfo, LogOptions, LogLevel, ApplicationLogger } from '../fit-logger-core/index';
import { LoggingController } from './logwriters/logging.controller';


@Injectable()
export class FitLoggerService extends ApplicationLoggingService {

  constructor() {
    super();
  }

  public init(loggerStaticInfo: LoggerStaticInfo, options?: LogOptions) {
    LoggingController.instance.initialize(loggerStaticInfo,options);
  }

  getLogger(name: string, level?: LogLevel) : ApplicationLogger {
    return LoggerFactory.instance.getLogger(name,level);
  }
}
