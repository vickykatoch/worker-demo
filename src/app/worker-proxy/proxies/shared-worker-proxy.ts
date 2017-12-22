import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage, WorkerMessageTypes } from "../../config-models/index";



export class SharedWorkerProxy extends AbstractWorkerProxy {
    private worker: SharedWorker.SharedWorker;

    connect(): void {
        const worker = new SharedWorker(this.workerInfo.file, this.workerInfo.name);
        this._dispatcher = worker.port;
        this.worker.port.addEventListener('error', this.processWorkerError.bind(this));
        this.worker.port.addEventListener('message', this.processWorkerMessage.bind(this));
        this.worker.port.start();
    }
    send(): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        if (this.worker) {
            // TODO: Send Message to disonnect before 
            // this.worker.removeEventListener('message',this.processWorkerMessage);
            // this.worker.removeEventListener('error',this.processWorkerError);
            // this.worker.terminate();
        }
    }

    protected processWorkerMessage(evt: MessageEvent) {
        const message = evt.data;
        if (message instanceof WorkerMessage) {
            switch (message.type) {
                case WorkerMessageTypes.CONNECT_WORKER_SUCCESS:
                    this.workerConnNotifier.next(true);
                default:
                    this.messageNotifier.next(message);
            }
        } else {
            console.log('Unknown Message Received from worker ');
        }
    }
    protected processWorkerError(evt: ErrorEvent) {
        console.error(evt);
    }
}