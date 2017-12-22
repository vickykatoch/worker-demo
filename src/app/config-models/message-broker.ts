import { WorkerMessage } from "./worker-message";

export interface IMessageBroker {
    postMessage(workMessage: WorkerMessage) : void;
    addEventListener(eventName: string , callback: Function);
}