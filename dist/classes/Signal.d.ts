import { Client } from "./Client";
interface SignalRawData {
    target: string;
    id: string;
    createdTimestamp: number;
    data: any;
    token: string;
}
declare type Status = 'accept' | 'error';
declare class Signal {
    target: string;
    id: string;
    createdTimestamp: number;
    token: string;
    replied: boolean;
    client: Client;
    constructor(client: Client, data: SignalRawData);
    reply(status: Status, data?: any): Promise<void>;
    end(): Promise<void>;
}
export { Signal };
