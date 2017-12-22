import { Injectable } from '@angular/core';
import { WorkerInfo, WorkerMessage } from '../config-models/index';
import { WorkerFactory } from './worker-factory';
import { AbstractWorkerProxy } from './proxies';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkerProxyService {
  private workerMap = new Map<string, AbstractWorkerProxy>();


  constructor() { }

  initialize(workersInfo: WorkerInfo[]) {
    workersInfo.forEach(winfo => {
      if (!this.workerMap.has(winfo.name)) {
        const proxy = WorkerFactory.instance.getWorker(winfo);
        this.workerMap.set(winfo.name, proxy);
        proxy.connect();
      } else {
        console.log('Worker already exists');
      }
    });
  }

  getWorkerConnectionStatus(workerName: string): Observable<boolean> {
    return this.workerMap.get(workerName).workerConnectionStatus$;
  }
  messages(workerName: string): Observable<WorkerMessage> {
    return this.workerMap.get(workerName).messages$;
  }

}
