import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage } from "../../config-models";

export class LocalWorkerProxy extends AbstractWorkerProxy {    
    connect(): void {
        throw new Error("Method not implemented.");
    }
    send(message : WorkerMessage): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }
}