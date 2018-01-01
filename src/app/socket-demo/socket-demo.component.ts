import { Component, OnInit } from '@angular/core';
import { SocketController } from './socket/socket-controller';

@Component({
  selector: 'app-socket-demo',
  templateUrl: './socket-demo.component.html',
  styleUrls: ['./socket-demo.component.css']
})
export class SocketDemoComponent implements OnInit {
  private socketController : SocketController;
  messages = [];
  
  constructor() { 
    this.socketController = new SocketController();
    this.socketController.messages$.subscribe(x=>{
      this.messages.splice(0,0,x);
    });
  }

  ngOnInit() {
  }
  onStart() {
    this.socketController.connect();
  }

}
