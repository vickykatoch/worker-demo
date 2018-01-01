import { SocketIOController } from "./socket-io/socketio-controller";
import { MessageBroker } from "./index";

export class ControllerFactory {
    
    static getSocketController(broker: MessageBroker) {
        return new SocketIOController(broker);
    }
}