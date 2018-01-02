import * as io from 'socket.io-client';
import { ServerConnectionInfo } from '../../config-models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ConnectionStatus {
    name : string;
    isConnected : boolean;
}


export class SocketIOConnector {
    private socket : any
    private logger = console;
    private connStatusNotifier =  new BehaviorSubject<ConnectionStatus>(null);
    connectionStatus$ = this.connStatusNotifier.asObservable();
    
    constructor(private connectionInfo: ServerConnectionInfo) {
        this.socket = io(connectionInfo.url);
        this.socket.on('connect', this.onConnected.bind(this,'connect'));
        this.socket.on('reconnect', this.onConnected.bind(this,'reconnect'));
        this.socket.on('error', this.onConnectionError.bind(this,'error'));
        this.socket.on('connect_error', this.onConnectionError.bind(this,'connect_error'));
        this.socket.on('connect_timeout', this.onConnectionTimedout.bind(this));
        this.socket.on('reconnect_attempt', this.onReconnectAttempt.bind(this));
        this.socket.on('ping', this.onPing.bind(this));
        this.socket.on('pong', this.onPong.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
    }

    //#region Helper Methods
    private onConnected(evtType:string, socket: any) {
        console.info(evtType);
        this.connStatusNotifier.next({name: this.connectionInfo.name, isConnected: true});
    }
    private onConnectionError(evtType:string, error: any) {
        this.logger.info(evtType);
        this.connStatusNotifier.next({name: this.connectionInfo.name, isConnected: false});
    }
    private onConnectionTimedout(evt: any) {
        this.logger.info('Connection timed out');
        this.connStatusNotifier.next({name: this.connectionInfo.name, isConnected: false});
    }
    private onReconnectAttempt(evt: any) {
        this.logger.info('Re-connecting',evt);
    }
    private onPing(evt: any) {
        this.logger.info('Ping',evt);
    }
    private onPong(evt: any) {
        this.logger.info('Pong',evt);
    }
    private onDisconnect(evt:any) {
        this.logger.info('Disconnected',evt);
        this.connStatusNotifier.next({name: this.connectionInfo.name, isConnected: false});
    }
    //#endregion
}