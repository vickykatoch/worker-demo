import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkerProxyModule } from './worker-proxy';

import { AppComponent } from './app.component';
import { SocketDemoComponent } from './socket-demo/socket-demo.component';
import { NumberSpinnerModule } from './number-spinner/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    SocketDemoComponent
  ],
  imports: [
    BrowserModule,
    WorkerProxyModule,
    FormsModule,
    ReactiveFormsModule,
    NumberSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
