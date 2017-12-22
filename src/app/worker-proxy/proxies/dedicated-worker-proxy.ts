import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder } from "../../config-models/index";



export class DedicatedWorkerProxy extends AbstractWorkerProxy {
    private worker: Worker;

    connect(): void {
        this._dispatcher = new Worker(this.workerInfo.file);
        this.wireBrokerEvents();
    }

    dispose(): void {
        if (this.worker) {
            // TODO: Send Message to disonnect before
            this.worker.removeEventListener('message', this.processWorkerMessage);
            this.worker.removeEventListener('error', this.processWorkerError);
            this.worker.terminate();
        }
    }
}
