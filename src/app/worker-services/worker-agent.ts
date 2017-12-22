import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder } from "../config-models/index";



export class WorkerAgent {
    private static _instance: WorkerAgent = new WorkerAgent();

    constructor() {
        if (WorkerAgent._instance) {
            throw new Error("Error: Instantiation failed: Use WorkerAgent.instance instead of new.");
        }
        WorkerAgent._instance = this;
    }

    static get instance(): WorkerAgent {
        return WorkerAgent._instance;
    }

    private context : any;

    setContext(context: any) {
        this.context = context;
    }

    onMessage(message: WorkerMessage) {
        switch(message.type) {
            case WorkerMessageTypes.CONNECT_WORKER:
                this.context['name'] = message.payload.name;
                this.dispatchMessage(WorkerMessageBuilder.createMessage(WorkerMessageTypes.CONNECT_WORKER_SUCCESS));
                break;
            default:
            // TODO: Send to SocketService
        }
    }
    dispatchMessage(message: WorkerMessage) {
        this.context.postMessage(message);
    }
}