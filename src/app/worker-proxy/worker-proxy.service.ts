import { Injectable } from '@angular/core';
import { WorkerInfo, WorkerMessage, WorkerConfig } from '../config-models/index';
import { WorkerFactory } from './worker-factory';
import { AbstractWorkerProxy } from './proxies';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkerProxyService {
  private workerMap = new Map<string, AbstractWorkerProxy>();

  constructor() { }

  initialize(workersConfig: WorkerConfig[]) {
    workersConfig.forEach(config => {
      if (!this.workerMap.has(config.workerInfo.name)) {
        const proxy = WorkerFactory.instance.getWorker(config);
        this.workerMap.set(proxy.name, proxy);
        proxy.connect();
      } else {
        console.log('Worker already exists');
      }
    });
  }

  getWorkerConnectionStatus(workerName: string): Observable<boolean> {
    return this.workerMap.get(workerName).workerReady$;
  }
  messages(workerName: string): Observable<WorkerMessage> {
    return this.workerMap.get(workerName).messages$;
  }

}
