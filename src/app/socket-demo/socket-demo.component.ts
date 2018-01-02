import { Component, OnInit } from '@angular/core';
import { SocketController } from './socket/socket-controller';
import { MessageBrokerProxy } from './socket/message-broker-proxy';
import { WorkerMessageBuilder, WorkerMessageTypes } from '../config-models/index';

@Component({
  selector: 'app-socket-demo',
  templateUrl: './socket-demo.component.html',
  styleUrls: ['./socket-demo.component.css']
})
export class SocketDemoComponent implements OnInit {
  private socketController: SocketController;
  messages = [];

  constructor() {
    this.socketController = new SocketController();
    this.socketController.messages$.subscribe(x => {
      this.messages.splice(0, 0, x);
    });
  }

  ngOnInit() {
  }
  
  onStart() {
    this.socketController.connect();

  }

  onConnect() {
    const connectInfo = {
      name: 'SIO-CONNECT',
      url: 'http://localhost:3000',
      hbInterval: 1000
    };
    const msg = WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_SOCKET, connectInfo);
    MessageBrokerProxy.instance.onMessage(msg);
    MessageBrokerProxy.instance.inBox$.subscribe(message => {
      console.info(message);
    });
  }
}
