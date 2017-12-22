import { LoggerStaticInfo, LogOptions } from "../fit-logger-core/index";


// export type WorkerType = 'DEDICATED' | 'SHARED' | 'LOCAL';
export const WorkerTypes = Object.freeze({
  DEDICATED : 'DEDICATED',
  SHARED : 'SHARED',
  LOCAL : 'LOCAL'
});

export interface WorkerInfo {
    name : string;
    file: string;
    isActive: boolean;
    type: string;
}

export interface WorkerConfig {
  workerInfo: WorkerInfo;
  loggingAppInfo : LoggerStaticInfo;
  logOptions : LogOptions;
}

export interface BrokerConfig {
    workerConfig : WorkerConfig;
    context : any;
}

