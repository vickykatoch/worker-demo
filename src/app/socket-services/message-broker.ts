import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder,BrokerConfig, WorkerConfig } from "../config-models/index";
import { Subject } from "rxjs/Subject";
import { FitWorkerLoggerService } from "../fit-logger/fit-worker-logger.service";
import { ApplicationLogger } from "../fit-logger-core/index";


export class MessageBroker {

  //#region Static Members
  private static _instance: MessageBroker = new MessageBroker();
  constructor() {
    if (MessageBroker._instance) {
      throw new Error("Error: Instantiation failed: Use MessageBroker.instance instead of new.");
    }
    MessageBroker._instance = this;
  }

  static get instance(): MessageBroker {
    return MessageBroker._instance;
  }
  //#endregion

  //#region Private/Public Members
  private inBoxMessageNotifier = new Subject<WorkerMessage>();
  public inBox$ = this.inBoxMessageNotifier.asObservable();
  private contexts = new Map<string, BrokerConfig>();
  private logger : any = console;
  //#endregion

  //#region Public Methods
  onMessage(workerMessage: WorkerMessage, context: any) {
    switch (workerMessage.type) {
      case WorkerMessageTypes.CONNECT_WORKER:
      this.logger.info('Worker connection request received');
      this.postMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER_SUCCESS), context);
        break;
      case WorkerMessageTypes.SET_WORKER_CONFIG:
        this.onSetConfigRequestReceived(workerMessage,context);
        break;
      default:
        this.inBoxMessageNotifier.next(workerMessage);
        break;
    }
  }
  postMessage(workerMessage: WorkerMessage, context?: any, sendToAll?: boolean) {
    if(!sendToAll) {
      context.postMessage(workerMessage);
    } else {
      this.contexts.forEach(value=>{
        value.context.postMessage(workerMessage);
      });
    }
  }
  //#endregion

  //#region Helper Methods
  private onSetConfigRequestReceived(workerMessage: WorkerMessage, context?: any) {
    const payload = <WorkerConfig>workerMessage.payload;
    if(context && payload) {
      if(payload.workerInfo && payload.workerInfo.name && payload.loggingAppInfo.appName) {
        const key = `${payload.workerInfo.name}-${payload.loggingAppInfo.appName}`;
        const brokerConfig : BrokerConfig = { workerConfig : payload, context };
        this.contexts.set(key,brokerConfig);
        payload.loggingAppInfo.appName = `${payload.workerInfo.name}-${payload.workerInfo.type}-${payload.loggingAppInfo.appName}`;
        FitWorkerLoggerService.instance.init(payload.loggingAppInfo,payload.logOptions);
        this.logger = FitWorkerLoggerService.instance.getLogger('MessageBroker');
        this.postMessage(WorkerMessageBuilder.build(WorkerMessageTypes.WORKER_READY), context);
        this.logger.info('Worker configuration has been set successfully.', payload);
        return;
      }
    }
    this.postMessage(WorkerMessageBuilder.build(WorkerMessageTypes.SET_WORKER_CONFIG_FAILED, 'InComplete worker configuration'), context);
  }
  //#endregion
}
