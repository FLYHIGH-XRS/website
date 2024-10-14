import CryptoJS from 'crypto-js';

export function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString();
}