import { Component } from '@angular/core';
import { WorkerInfo, WorkerConfig, WorkerTypes } from './config-models';
import { WorkerProxyService } from './worker-proxy';
import { LogLevel } from './fit-logger-core/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private workersInfo : WorkerInfo[] = [

  ];

  constructor(private workerProxyService: WorkerProxyService) {
    workerProxyService.initialize(this.getWorkersConfig());
  }

  getWorkersConfig() : WorkerConfig[] {
    return [
      {
        workerInfo : {
          name : 'DATA-WORKER',
          file : 'assets/workers/dworker.js',
          isActive : true,
          type : WorkerTypes.LOCAL
        },
        loggingAppInfo : {
          appName : 'Main',
          user : 'BK'
        },
        logOptions : {
          appLogLevel : LogLevel.DEBUG,
          logInterval : 1000,
          appenders : [
            {
              name : 'console',
              format: 'text',
              logLevel: LogLevel.DEBUG
            }
          ]
        }
      },

      //  {
      //   workerInfo : {
      //     name : 'SHARED-WORKER',
      //     file : 'assets/workers/sworker.js',
      //     isActive : true,
      //     type : WorkerTypes.SHARED
      //   },
      //   loggingAppInfo : {
      //     appName : 'ML',
      //     user : 'BK'
      //   },
      //   logOptions : {
      //     appLogLevel : LogLevel.DEBUG,
      //     logInterval : 1000,
      //     appenders : [
      //       {
      //         name : 'console',
      //         format: 'text',
      //         logLevel: LogLevel.DEBUG
      //       }
      //     ]
      //   }
      // }
    ];
  }
}
