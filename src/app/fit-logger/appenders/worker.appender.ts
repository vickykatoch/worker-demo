import { Appender } from './appender';
import { LoggingEvent } from '../models/log-event';
import { AppenderOptions } from '../../fit-logger-core/index';



export class WebWorkerAppender implements Appender {
  private worker: SharedWorker.SharedWorker;
  private isWorkerReady = false;

  constructor(private options: AppenderOptions) {

  }

  get name(): string {
    return 'worker';
  }
  writeLog(loggingEvent: LoggingEvent): void {
    // throw new Error("Method not implemented.");
  }
  writeLogs(loggingEvent: LoggingEvent[]): void {
    if (this.isWorkerReady) {
      this.worker.port.postMessage({ type: 'LOG_MESSAGE', payload: loggingEvent });
    }
  }

  update(appenderOptions: AppenderOptions): void {
    this.dispose();
    this.options = appenderOptions;
    this.worker = new SharedWorker(appenderOptions.path, 'Logger-Worker23');
    this.worker.port.addEventListener('error', this.onWorkerError.bind(this));
    this.worker.port.addEventListener('message', this.onWorkerMessage.bind(this));
    this.worker.port.start();
  }

  private onWorkerError(errorEvt: ErrorEvent) {
    console.error(errorEvt);
  }
  private onWorkerMessage(evt: MessageEvent) {
    if(evt.data.type === 'WORKER_CONNECTED') {
      this.isWorkerReady = true;
    }
    console.info(evt.data);
  }
  private dispose(): void {
    if (this.worker) {
      this.isWorkerReady = false;
      this.worker.port.removeEventListener('error', this.onWorkerError.bind(this));
      this.worker.port.removeEventListener('message', this.onWorkerMessage.bind(this));
      this.worker.port.close();
    }
  }
}
