import { Component } from '@angular/core';
import { WorkerInfo } from './config-models';
import { WorkerProxyService } from './worker-proxy';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private workersInfo : WorkerInfo[] = [
    {
      name : 'DATA-WORKER',
      file : 'assets/workers/dworker.js',
      isActive : true,
      type : 1
    }
  ];

  constructor(private workerProxyService: WorkerProxyService) {
    workerProxyService.initialize(this.workersInfo);
  }
}
