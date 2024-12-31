import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import txnRouter from "./routes/txn";
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.get('/healthcheck', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api/user', userRouter);
app.use('/api/txn', txnRouter);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});
