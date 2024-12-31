import { Connection } from '@solana/web3.js';
import CryptoJS from 'crypto-js';

const secretKey = process.env.ENCRYPTION_SECRET as string;

export const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
export function encryptPrivateKey(privateKey: string): string {
    return CryptoJS.AES.encrypt(privateKey, secretKey).toString();
}

export function decryptPrivateKey(encryptedPrivateKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
