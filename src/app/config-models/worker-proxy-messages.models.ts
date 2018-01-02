export interface ServerConnectionInfo {
    name : string;
    url : string;
    hbInterval : number;
    fallbacks? : string[];
}