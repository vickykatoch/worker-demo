import { Subject } from "rxjs/Subject";
import { WorkerMessage } from "../../config-models/index";



export class MessageBrokerProxy {


    //#region Static Members
    private static _instance: MessageBrokerProxy = new MessageBrokerProxy();
    constructor() {
        if (MessageBrokerProxy._instance) {
            throw new Error("Error: Instantiation failed: Use MessageBroker.instance instead of new.");
        }
        MessageBrokerProxy._instance = this;
    }

    static get instance(): MessageBrokerProxy {
        return MessageBrokerProxy._instance;
    }
    //#endregion

    private notifier = new Subject<WorkerMessage>();
    inBox$ = this.notifier.asObservable();
    
    private outboxNotifier = new Subject<WorkerMessage>();
    ouBox$ = this.outboxNotifier.asObservable();

    onMessage(message: WorkerMessage) {
        this.notifier.next(message);
    }
    postMessage(message: WorkerMessage) {
        this.outboxNotifier.next(message);
    }

}