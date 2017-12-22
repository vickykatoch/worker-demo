import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerProxyService } from './worker-proxy.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    WorkerProxyService
  ]
})
export class WorkerProxyModule { }
