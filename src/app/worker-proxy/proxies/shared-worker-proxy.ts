import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage, WorkerMessageTypes } from "../../config-models/index";



export class SharedWorkerProxy extends AbstractWorkerProxy {

    connect(): void {
        const worker : SharedWorker.SharedWorker = new SharedWorker(this.workerInfo.file, this.workerInfo.name);
        this._dispatcher = worker.port;
        this.wireBrokerEvents();
        worker.port.start();
    }

    dispose(): void {
        if (this.worker) {
            // TODO: Send Message to disonnect before
            // this.worker.removeEventListener('message',this.processWorkerMessage);
            // this.worker.removeEventListener('error',this.processWorkerError);
            // this.worker.terminate();
        }
    }
}
