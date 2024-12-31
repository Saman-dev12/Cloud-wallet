import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key';

export function encryptPrivateKey(privateKey: string): string {
    return CryptoJS.AES.encrypt(privateKey, secretKey).toString();
}

export function decryptPrivateKey(encryptedPrivateKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
