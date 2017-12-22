import { WorkerMessage } from "../config-models/index";



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

    }
}