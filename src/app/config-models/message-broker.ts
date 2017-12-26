import { WorkerMessage } from "./worker-message";

export interface IMessageBroker {
    postMessage(workMessage: WorkerMessage, isLocal?: boolean) : void;
    addEventListener(eventName: string , callback: Function);
}
