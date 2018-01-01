import { MessageBroker } from "../index";
import { filter } from "rxjs/operators/filter";
import { WorkerMessage } from "../../config-models/index";



export class SocketIOController {

    constructor(private broker: MessageBroker) {
        broker.inBox$.pipe(
            filter((m: WorkerMessage) => m!==null)
        ).subscribe(message=> {
            console.log(message);
        });
    }

}