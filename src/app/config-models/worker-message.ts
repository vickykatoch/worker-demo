
export class WorkerMessage {
    type : string;
    constructor(public payload?: any) {

    }
}

export class WorkerMessageBuilder {
    static createMessage(type: string,payload?: any) {
        const message = new WorkerMessage(payload);
        message.type = type;
        return message;
    }
}