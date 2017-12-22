import { WorkerInfo } from "../config-models/index";
import * as proxies from './proxies';

export class WorkerFactory {
    private static _instance: WorkerFactory = new WorkerFactory();

    constructor() {
        if (WorkerFactory._instance) {
            throw new Error("Error: Instantiation failed: Use LoggingStore.instance instead of new.");
        }
        WorkerFactory._instance = this;
    }
    getWorker(workerInfo: WorkerInfo): proxies.AbstractWorkerProxy {
        switch (workerInfo.type) {
            case 0:
                return new proxies.LocalWorkerProxy(workerInfo);
            case 1:
                return new proxies.DedicatedWorkerProxy(workerInfo);
            case 2 :
                return new proxies.SharedWorkerProxy(workerInfo);
            default:
                throw new Error('Unknown worker type');
        }
    }
    static get instance(): WorkerFactory {
        return WorkerFactory._instance;
    }
}