import {  Keypair, Transaction } from "@solana/web3.js";
import { Router } from "express";
import User from "../models/usermodel";
import { decryptPrivateKey,connection } from "../utils";
import bs58 from "bs58";
import authMiddleware from "../middleware/middleware";

const router = Router()
router.post('/sign', authMiddleware,async(req, res) => {
    const {tx} = req.body;
    const deserialize = Transaction.from(tx.data);

    const user = req.user;
    const userid = user.id;
    const userRec = await User.findById(userid);
    if(!userRec){
        res.status(404).json({error: 'User not found.'});
        return;
    }
    const secretKey = userRec.privateKey;
    const privateKey = decryptPrivateKey(secretKey);
    const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));
    const {blockhash} = await connection.getLatestBlockhash();
    deserialize.feePayer = keypair.publicKey
    deserialize.recentBlockhash = blockhash

    deserialize.sign(keypair);

    const signature =await connection.sendTransaction(deserialize,[keypair]);
    res.json({success: true, signature});


});

export default router;