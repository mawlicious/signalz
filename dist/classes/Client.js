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
const events_1 = require("events");
const SignalError_1 = require("../util/SignalError");
const util_1 = require("../util/util");
const SentSignal_1 = require("./SentSignal");
const Signal_1 = require("./Signal");
class Client extends events_1.EventEmitter {
    constructor(clientId, database, options) {
        var _a;
        super();
        this.customPath = 'signals/';
        this.clientId = clientId;
        this.database = database;
        if (options && options.customPath) {
            if (!((_a = options.customPath) === null || _a === void 0 ? void 0 : _a.endsWith('/')))
                throw new SignalError_1.SignalError(`Custom Path must end with /`);
            this.customPath = options === null || options === void 0 ? void 0 : options.customPath;
        }
        // Add indexing rules for better performance
        (() => __awaiter(this, void 0, void 0, function* () {
            const currentRules = yield database.getRulesJSON();
            if (currentRules.rules[this.customPath.replace('/', '')])
                return;
            currentRules.rules[this.customPath.replace('/', '')] = {
                ".indexOn": ["createdTimestamp"]
            };
            database.setRules(currentRules);
        }))();
        database.ref(this.customPath).orderByChild('createdTimestamp').startAt(Date.now()).on('child_added', (snapshot) => {
            const data = snapshot.val();
            if (data.target !== this.clientId)
                return;
            this.emit("signal", new Signal_1.Signal(this, data));
        });
    }
    sendSignal(id, targetClientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const signalToken = util_1.token();
            if (data == null)
                throw new SignalError_1.SignalError("Data can't be null.");
            yield this.database.ref(`${this.customPath}/signal-${signalToken}`).set({
                target: targetClientId,
                id: id,
                createdTimestamp: Date.now(),
                data: data,
                token: signalToken
            });
            return new SentSignal_1.SentSignal(this, {
                target: targetClientId,
                id: id,
                createdTimestamp: Date.now(),
                data: data,
                token: signalToken
            });
        });
    }
}
exports.Client = Client;
