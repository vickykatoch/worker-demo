import { Injectable } from "@angular/core";
import { WorkerProxyService } from "./worker-proxy";



@Injectable()
export class DataService {

    constructor(private workerProxyService: WorkerProxyService) {
        // workerProxyService.connect();
    }
    init() {

    }
    subscribe() {

    }
}