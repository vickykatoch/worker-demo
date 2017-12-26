// import { WorkerMessage, WorkerMessageTypes, WorkerMessageBuilder,IMessageBroker } from "../config-models/index";



// export class WorkerAgent {

//   //#region Static
//   private static _instance: WorkerAgent = new WorkerAgent();
//   constructor() {
//     if (WorkerAgent._instance) {
//       throw new Error("Error: Instantiation failed: Use WorkerAgent.instance instead of new.");
//     }
//     WorkerAgent._instance = this;
//   }

//   static get instance(): WorkerAgent {
//     return WorkerAgent._instance;
//   }
//   //#endregion

//   // #region Private Members
//   private contexts = new Map<string,IMessageBroker>();
//   //#endregion

//   //#region Public Methods

//   onMessage(message: WorkerMessage) {
//     switch (message.type) {
//       case WorkerMessageTypes.CONNECT_WORKER:
//         // this.context['name'] = message.payload.name;
//         this.dispatchMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER_SUCCESS));
//         break;
//       case WorkerMessageTypes.SET_WORKER_CONFIG:

//         break
//       default:
//       // TODO: Send to SocketService
//     }
//   }
//   dispatchMessage(message: WorkerMessage) {
//     this.context.postMessage(message);
//   }
//   //#endregion

//   // #region Helper Methods
//   private onConnectRequestReceived() {

//   }
//   //#endregion
// }
