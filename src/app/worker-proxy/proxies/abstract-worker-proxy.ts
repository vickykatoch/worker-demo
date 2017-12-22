import { WorkerInfo, WorkerMessage, IMessageBroker } from "../../config-models/index";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


export abstract class AbstractWorkerProxy {
    protected _isConnected = false;
    protected messageNotifier = new Subject<WorkerMessage>();
    protected workerConnNotifier = new BehaviorSubject<boolean>(false);
    protected _dispatcher : IMessageBroker;

    public workerConnectionStatus$ = this.workerConnNotifier.asObservable();
    public messages$ = this.messageNotifier.asObservable();
    

    constructor(public workerInfo: WorkerInfo) {
    }

    get isConnected() : boolean {
        return this._isConnected;
    }

    abstract connect(): void;
    send(message : WorkerMessage): void {
        this._dispatcher.postMessage(message);
    }
    abstract dispose(): void;
    protected processWorkerMessage(evt: MessageEvent) {

    }
    protected processWorkerError(evt: ErrorEvent) {
        console.error(evt);
    }
    protected wireBrokerEvents() {
        this._dispatcher.addEventListener('message', this.processWorkerMessage.bind(this));
        this._dispatcher.addEventListener('error', this.processWorkerError.bind(this));
    }
}