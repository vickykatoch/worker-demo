import { AbstractWorkerProxy } from "./abstract-worker-proxy";
import { WorkerMessage, WorkerMessageBuilder, IMessageBroker, WorkerMessageTypes } from "../../config-models";
import { MessageBroker } from "../../socket-services";

export class LocalWorkerProxy extends AbstractWorkerProxy {
  connect(): void {
    this._dispatcher = new MessageDispatcher();
    this.wireBrokerEvents();
    this.send(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER));
  }
  send(message: WorkerMessage): void {
    this._dispatcher.postMessage(message, true);
  }
  dispose(): void {
  }
}

class MessageDispatcher implements IMessageBroker {
  private eventMap = new Map<string, Function>();

  constructor() { }

  postMessage(workMessage: WorkerMessage, isLocal?: boolean): void {
    if (isLocal) {
      MessageBroker.instance.onMessage(workMessage, this);
    } else {
      if (this.eventMap.has('message')) {
        const func = this.eventMap.get('message');
        func({ data: workMessage });
      } else {
        console.error('Event handler is not subscribed');
      }
    }
  }

  addEventListener(eventName: string, callback: Function) {
    this.eventMap.set(eventName, callback);
  }
}
