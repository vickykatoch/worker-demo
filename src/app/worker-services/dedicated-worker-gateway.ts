// import { WorkerAgent } from './worker-agent';
import { MessageBroker } from '../socket-services';
import { WorkerMessageBuilder, WorkerMessageTypes } from '../config-models';

console.info('Dedicated worker has been started');

MessageBroker.instance.onMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER),self);

self.addEventListener('message', (evt: MessageEvent) => {
  MessageBroker.instance.onMessage(evt.data,self);
});

self.addEventListener('messageerror', (evt: ErrorEvent) => {
    console.error(evt);
});
