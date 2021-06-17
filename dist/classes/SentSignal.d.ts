import { Client } from "./Client";
interface SignalRawData {
    target: string;
    id: string;
    createdTimestamp: number;
    data: any;
    token: string;
}
declare type Status = 'accept' | 'error';
interface Reply {
    status: Status;
    data: any;
}
declare class SentSignal {
    target: string;
    id: string;
    createdTimestamp: number;
    token: string;
    replied: boolean;
    client: Client;
    constructor(client: Client, data: SignalRawData);
    awaitReply(timeout: number): Promise<Reply>;
    end(): Promise<void>;
}
export { SentSignal };
