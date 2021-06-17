import { EventEmitter } from "events";
import { database } from 'firebase-admin';
import { SentSignal } from "./SentSignal";
import { Signal } from "./Signal";
interface ClientOptions {
    customPath?: string;
}
declare interface Client {
    on(event: 'signal', listener: (signal: Signal) => void): this;
}
declare class Client extends EventEmitter {
    clientId: string;
    database: database.Database;
    customPath: string;
    constructor(clientId: string, database: database.Database, options?: ClientOptions);
    sendSignal(id: string, targetClientId: string, data: any): Promise<SentSignal>;
}
export { Client };
