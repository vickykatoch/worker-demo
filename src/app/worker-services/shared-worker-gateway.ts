import { MessageBroker } from "../socket-services";
import { WorkerMessageBuilder, WorkerMessageTypes } from "../config-models";



let connnections = 0;
console.info('Shared worker has been started');

self.addEventListener("connect", (evt: MessageEvent) => {
  const port: MessagePort = evt.ports[0];
  MessageBroker.instance.onMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER),port);
  connnections++;
  port.addEventListener("message", (e: MessageEvent) => {
    MessageBroker.instance.onMessage(e.data, port);
  }, false);
  port.start();
  console.log(`Connections Count : ${connnections}`);
}, false);
