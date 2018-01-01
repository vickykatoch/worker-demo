import { MessageBrokerProxy } from "./message-broker-proxy";
import { WorkerMessage, WorkerMessageTypes } from "../../config-models/index";

interface ServerInfo {

}


export class SocketIOController {

    private subscriberMap = new Map<string,ServerInfo>();

    constructor(private broker: MessageBrokerProxy) {
        broker.inBox$.subscribe(this.onMessageReceived.bind(this));
    }

    private onMessageReceived(message: WorkerMessage) {
        switch(message.type) {
            case WorkerMessageTypes.CONNECT_SOCKET: 
                this.onConnectRequestReceived(message);
                break;
            case WorkerMessageTypes.SUBSCRIBE_DATA:
                this.onSubscribeRequestReceived(message);
                break;
        }
    }
    private onConnectRequestReceived(message: WorkerMessage) {
        
    }
    private onSubscribeRequestReceived(message: WorkerMessage) {

    }

}