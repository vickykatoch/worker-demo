import { SocketController } from "./socket-controller";

export class SocketControllerFactory {

    static getController() : SocketController {
        return new SocketController();
    }
    
}