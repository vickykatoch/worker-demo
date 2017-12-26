import { LoggingEvent } from "../models/log-event";
import { AppenderOptions } from "../../fit-logger-core/index";



export interface Appender {
  name: string;
  writeLog(loggingEvent: LoggingEvent) : void;
  writeLogs(loggingEvent: LoggingEvent[]) : void;
  update(appenderOptions: AppenderOptions) : void;
}
