export interface WorkerInfo {
    name : string;
    file: string;
    isActive: boolean;
    type: number; // 0- Local, 1- Dedicated, 2- Shared
}