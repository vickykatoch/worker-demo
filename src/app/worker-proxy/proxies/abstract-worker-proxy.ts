import { WorkerInfo } from "../../config-models/index";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { WorkerMessage } from "../../config-models";



export abstract class AbstractWorkerProxy {
    protected _isConnected = false;
    protected messageNotifier = new Subject<WorkerMessage>();
    protected workerConnNotifier = new BehaviorSubject<boolean>(false);

    public workerConnectionStatus$ = this.workerConnNotifier.asObservable();
    public messages$ = this.messageNotifier.asObservable();
    

    constructor(public workerInfo: WorkerInfo) {
    }

    get isConnected() : boolean {
        return this._isConnected;
    }

    abstract connect(): void;
    abstract send(): void;
    abstract dispose(): void;
}