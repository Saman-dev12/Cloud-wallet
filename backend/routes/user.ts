import { Router } from "express";
import User from "../models/usermodel";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/middleware";

const router = Router();

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ENCRYPTION_SECRET || !JWT_SECRET) {
    throw new Error('ENCRYPTION_SECRET and JWT_SECRET must be defined in the environment variables.');
}

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists.' });
            return;
        }

        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toString();
        const privateKey = bs58.encode(keypair.secretKey);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({ email, password: hashedPassword, publicKey, privateKey });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password.' });
            return;
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Login successful.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

router.post('/logout', async (req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful.' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
    
})

router.get('/profile', authMiddleware ,async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;
        const userRec = await User.findById(userId);
        if (!userRec) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        ;
        res.status(200).json({ email: userRec.email, publicKey: userRec.publicKey, privateKey:userRec.privateKey });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
})

export default router;
