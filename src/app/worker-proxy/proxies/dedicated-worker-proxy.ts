import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder } from "../../config-models/index";



export class DedicatedWorkerProxy extends AbstractWorkerProxy {
    private worker: Worker;

    connect(): void {
        this._dispatcher = new Worker(this.workerInfo.file); 
        this.wireBrokerEvents();
        
        setTimeout(() => {
            this.send(
                WorkerMessageBuilder.createMessage(WorkerMessageTypes.CONNECT_WORKER, this.workerInfo));
        }, 100);
    }
    
    dispose(): void {
        if (this.worker) {
            // TODO: Send Message to disonnect before 
            this.worker.removeEventListener('message', this.processWorkerMessage);
            this.worker.removeEventListener('error', this.processWorkerError);
            this.worker.terminate();
        }
    }

    protected processWorkerMessage(evt: MessageEvent) {
        const message = evt.data;
        if (message && message.type) {
            console.info(evt);
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