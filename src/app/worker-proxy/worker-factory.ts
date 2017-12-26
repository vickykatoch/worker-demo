import { WorkerConfig, WorkerTypes } from "../config-models/index";
import * as proxies from './proxies';

export class WorkerFactory {
    private static _instance: WorkerFactory = new WorkerFactory();

    constructor() {
        if (WorkerFactory._instance) {
            throw new Error("Error: Instantiation failed: Use LoggingStore.instance instead of new.");
        }
        WorkerFactory._instance = this;
    }
    getWorker(workerConfig: WorkerConfig): proxies.AbstractWorkerProxy {
        switch (workerConfig.workerInfo.type) {
            case WorkerTypes.LOCAL:
                return new proxies.LocalWorkerProxy(workerConfig);
            case WorkerTypes.DEDICATED:
                return new proxies.DedicatedWorkerProxy(workerConfig);
            case WorkerTypes.SHARED :
                return new proxies.SharedWorkerProxy(workerConfig);
            default:
                throw new Error('Unknown worker type');
        }
    }
    static get instance(): WorkerFactory {
        return WorkerFactory._instance;
    }
}
