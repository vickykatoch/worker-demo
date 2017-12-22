import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder } from "../../config-models/index";



export class DedicatedWorkerProxy extends AbstractWorkerProxy {
    private worker: Worker;

    connect(): void {
        this.worker = new Worker(this.workerInfo.file);
        this.worker.addEventListener('message', this.processWorkerMessage.bind(this));
        this.worker.addEventListener('error', this.processWorkerError.bind(this));
        setTimeout(() => {
            this.worker.postMessage(
                WorkerMessageBuilder.createMessage(WorkerMessageTypes.CONNECT_WORKER, this.workerInfo));
        }, 100);
    }
    send(): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        if (this.worker) {
            // TODO: Send Message to disonnect before 
            this.worker.removeEventListener('message', this.processWorkerMessage);
            this.worker.removeEventListener('error', this.processWorkerError);
            this.worker.terminate();
        }
    }

    private processWorkerMessage(evt: MessageEvent) {
        debugger;
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
    private processWorkerError(evt: ErrorEvent) {
        debugger;
        console.error(evt);
    }
}