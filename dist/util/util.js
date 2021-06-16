"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token = () => {
    const all = '1234567890qwertyuiopasdfghjklzxcvbnm';
    const allArray = all.split('');
    let result = '';
    for (let i = 0; i < 20; i++) {
        result = result + allArray[Math.floor(Math.random() * allArray.length)];
    }
    return result;
};
exports.token = token;
