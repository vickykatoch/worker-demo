import { Component } from '@angular/core';
import { WorkerInfo, WorkerConfig, WorkerTypes } from './config-models';
import { WorkerProxyService } from './worker-proxy';
import { LogLevel } from './fit-logger-core/index';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  price : number = 104.4567;
  formattedPrice = 0;
  public reactiveForm: FormGroup;
  formatValue = 10;

  private workersInfo : WorkerInfo[] = [

  ];

  onValueChanged(value: number) {
    this.formattedPrice= value;
  }
  constructor(private workerProxyService: WorkerProxyService, fb: FormBuilder) {
    // workerProxyService.initialize(this.getWorkersConfig());
    this.reactiveForm = fb.group({
      name : new FormControl('Balwinder Katoch',Validators.required),
      age : new FormControl(43, Validators.required),
      salary : new FormControl(400)
    });
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
