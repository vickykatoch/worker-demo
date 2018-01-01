import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';


export class SocketController {
    private socket: any;
    private notifier = new Subject<any>();
    messages$ = this.notifier.asObservable();

    connect() {
        
        this.socket = io('http://localhost:3000');
        
        this.socket.on('connect',(socket)=> {
            console.info('Connected : ');
        });
        this.socket.on('time', (payload) => {
            console.info('Connected : ', payload);
            this.notifier.next(payload);
        });
        this.socket.on('disconnect', (payload) => {
            console.info('disconnected : ', payload);
        });
    }
}