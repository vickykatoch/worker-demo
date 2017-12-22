
export interface WorkerMessage {
    type : string;
    // sender?: string;
    ts : number;
    payload?: any
}

export class WorkerMessageBuilder {
    static build(type: string,payload?: any) {
      return {
        type,
        ts : Date.now(),
        payload
      };
    }
}
