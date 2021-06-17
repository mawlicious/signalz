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
const SignalError_1 = require("../util/SignalError");
class Signal {
    constructor(client, data) {
        this.replied = false;
        this.target = data.target;
        this.id = data.id;
        this.createdTimestamp = data.createdTimestamp;
        this.token = data.token;
        this.client = client;
    }
    reply(status, data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.replied)
                throw new SignalError_1.SignalError('Already replied to signal');
            this.client.database.ref(`${this.client.customPath}signal-${this.token}/replied`).set({
                status: status,
                data: data,
            });
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.database.ref(`${this.client.customPath}signal-${this.token}`).remove();
        });
    }
}
exports.Signal = Signal;
