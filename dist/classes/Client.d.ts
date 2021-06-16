import { EventEmitter } from "events";
import { database } from 'firebase-admin';
interface ClientOptions {
    customPath?: string;
}
declare class Client extends EventEmitter {
    clientId: string;
    database: database.Database;
    signalPath: string;
    customPath: string | undefined;
    constructor(clientId: string, database: database.Database, options: ClientOptions);
    sendSignal(id: string, targetClientId: string, data: any): void;
}
export { Client };
