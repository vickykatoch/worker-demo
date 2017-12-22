import { AbstractWorkerProxy } from "./abstract-worker-proxy";

export class LocalWorkerProxy extends AbstractWorkerProxy {


    
    connect(): void {
        throw new Error("Method not implemented.");
    }
    send(): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }
}