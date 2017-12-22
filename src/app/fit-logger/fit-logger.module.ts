import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitLoggerService } from './fit-logger.service';
import { ApplicationLoggingService } from '../fit-logger-core/index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers : [
    {  provide : ApplicationLoggingService , useClass : FitLoggerService }
  ]
})
export class FitLoggerModule { }
