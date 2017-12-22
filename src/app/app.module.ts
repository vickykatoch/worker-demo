import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkerProxyModule } from './worker-proxy';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WorkerProxyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
