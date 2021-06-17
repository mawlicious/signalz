"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_timeout_1 = require("promise-timeout");
class SentSignal {
    constructor(client, data) {
        this.replied = false;
        this.target = data.target;
        this.id = data.id;
        this.createdTimestamp = data.createdTimestamp;
        this.token = data.token;
        this.client = client;
    }
    awaitReply(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const delayedPromise = new Promise((resolve, reject) => {
                this.client.database.ref(`${this.client.customPath}signal-${this.token}`).on('child_added', (snapshot) => {
                    const data = snapshot.val();
                    if (!data.status)
                        return;
                    resolve(data);
                });
            });
            return promise_timeout_1.timeout(delayedPromise, timeout);
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.database.ref(`${this.client.customPath}signal-${this.token}`).remove();
        });
    }
}
exports.SentSignal = SentSignal;
