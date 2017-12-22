import { WorkerInfo, WorkerMessage, IMessageBroker, WorkerMessageTypes, WorkerMessageBuilder, WorkerConfig } from "../../config-models";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


export abstract class AbstractWorkerProxy {
  //#region Private/Protected Members
  protected _isReady = false;
  protected messageNotifier = new Subject<WorkerMessage>();
  protected workerReadyNotifier = new BehaviorSubject<boolean>(false);
  protected _dispatcher: IMessageBroker;
  public workerReady$ = this.workerReadyNotifier.asObservable();
  public messages$ = this.messageNotifier.asObservable();
  protected workerInfo : WorkerInfo
  //#endregion

  //#region ctor

  constructor(protected _config: WorkerConfig) {
    this.workerInfo = _config.workerInfo;
  }
  //#endregion

  //#region Public Properties
  get isReady(): boolean {
    return this._isReady;
  }
  get name() : string {
    return this.workerInfo.name;
  }
  get config() : WorkerConfig {
    return this._config;
  }
  //#endregion

  //#region Public Methods
  send(message: WorkerMessage): void {
    this._dispatcher.postMessage(message);
  }
  abstract connect(): void;
  abstract dispose(): void;
  //#endregion

  //#region Helper Methods
  protected processWorkerMessage(evt: MessageEvent) {
    const message = evt.data;
    if (message && message.type) {
      switch (message.type) {
        case WorkerMessageTypes.CONNECT_WORKER_SUCCESS:
          this.send(WorkerMessageBuilder.build(WorkerMessageTypes.SET_WORKER_CONFIG, this.config));
          break;
        case WorkerMessageTypes.WORKER_READY:
          this._isReady = true;
          console.log(`Worker : ${this.name}  is ready`);
          this.workerReadyNotifier.next(true);
          break;
        default:
          this.messageNotifier.next(message);
      }
    } else {
      console.log('Unknown Message Received from worker ');
    }
  }
  protected processWorkerError(evt: ErrorEvent) {
    console.error(evt);
  }
  protected wireBrokerEvents() {
    this._dispatcher.addEventListener('message', this.processWorkerMessage.bind(this));
    this._dispatcher.addEventListener('error', this.processWorkerError.bind(this));
  }
  //#endregion

}
