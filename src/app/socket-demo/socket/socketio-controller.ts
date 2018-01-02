import { MessageBrokerProxy } from "./message-broker-proxy";
import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder } from "../../config-models/index";
import { SocketIOConnector } from "./socket-io.connector";
import { ServerConnectionInfo } from "../../config-models/worker-proxy-messages.models";
import { Subscription } from "rxjs/Subscription";
import { filter } from "rxjs/operators/filter";


interface ServerProviderInfo {
    provider : SocketIOConnector;
    connectionInfo: ServerConnectionInfo;
    subscription? : Subscription;
    isConnected? : boolean;
}


export class SocketIOController {
    private connectionMap = new Map<string,ServerProviderInfo>();

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
        const connectInfo = message.payload as ServerConnectionInfo;
        if(!this.connectionMap.has(connectInfo.name)) {
            const providerInfo = {
                provider : new SocketIOConnector(connectInfo),
                isConnected : false,
                connectionInfo: connectInfo
            };
            this.connectionMap.set(connectInfo.name, providerInfo);
            this.subscribeConnectionStatus(connectInfo.name);
        }
    }
    private onSubscribeRequestReceived(message: WorkerMessage) {

    }
    private subscribeConnectionStatus(connectionName: string) {
        const serverProvider = this.connectionMap.get(connectionName);
        serverProvider.subscription = 
            serverProvider.provider.connectionStatus$.pipe(
                filter(x=> x!==null)
            ).subscribe(status=> {
                if(this.connectionMap.has(status.name)) {
                    serverProvider.isConnected=status.isConnected;
                    const msgType = status.isConnected ? WorkerMessageTypes.CONNECT_SOCKET_SUCCESS : WorkerMessageTypes.CONNECT_SOCKET_FAILED;
                    this.broker.postMessage(WorkerMessageBuilder.build(msgType,serverProvider.connectionInfo));
                }
            });
    }

}