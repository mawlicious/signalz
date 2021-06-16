"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const SignalError_1 = require("../util/SignalError");
const util_1 = require("../util/util");
class Client extends events_1.EventEmitter {
    constructor(clientId, database, options) {
        var _a;
        super();
        this.signalPath = 'signals/';
        this.clientId = clientId;
        this.database = database;
        if (!((_a = options.customPath) === null || _a === void 0 ? void 0 : _a.endsWith('/')))
            throw new SignalError_1.SignalError(`Custom Path must end with /`);
        this.customPath = options.customPath;
        database.ref(this.customPath).on('child_added', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }
    sendSignal(id, targetClientId, data) {
        this.database.ref(`${this.customPath}${targetClientId}/signal-${util_1.token()}`).set({
            target: targetClientId,
            id: id,
            createdTimeStamp: Date.now(),
            data: data
        });
    }
}
exports.Client = Client;
