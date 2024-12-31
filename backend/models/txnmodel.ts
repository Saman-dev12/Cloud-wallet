import mongoose, { Schema, Document } from 'mongoose';

export interface ITxn extends Document {
    from: string;
    to: string;
    amount: number;
    timestamp: Date;
    status: string;
}

const TxnSchema: Schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, required: true }
});

export default mongoose.model<ITxn>('Txn', TxnSchema);