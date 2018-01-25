import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkerProxyModule } from './worker-proxy';

import { AppComponent } from './app.component';
import { SocketDemoComponent } from './socket-demo/socket-demo.component';
import { NumberSpinnerModule } from './number-spinner/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragTestComponent } from './drag-test/drag-test.component';
import { DragService } from './drag-test/directives/drag-service';
import { DropTargetDirective } from './drag-test/directives/drop-target.directive';
import { DraggableDirective } from './drag-test/directives/draggable';



@NgModule({
  declarations: [
    AppComponent,
    SocketDemoComponent,
    DragTestComponent,
    DropTargetDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    WorkerProxyModule,
    FormsModule,
    ReactiveFormsModule,
    NumberSpinnerModule
  ],
  providers: [
    DragService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
