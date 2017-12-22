import { WorkerAgent } from './worker-agent';

WorkerAgent.instance.setContext(self);
self.addEventListener('message', (evt: MessageEvent) => {
    WorkerAgent.instance.onMessage(evt.data);
});

self.addEventListener('messageerror', (evt: ErrorEvent) => {
    debugger;
    console.error(evt);
});