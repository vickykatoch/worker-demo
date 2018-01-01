import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkerProxyModule } from './worker-proxy';

import { AppComponent } from './app.component';
import { SocketDemoComponent } from './socket-demo/socket-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    SocketDemoComponent
  ],
  imports: [
    BrowserModule,
    WorkerProxyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
