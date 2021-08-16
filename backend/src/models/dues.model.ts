import mongoose, { Schema } from 'mongoose';
import { IDues } from '../interfaces/dues.interface';

const DuesSchema: Schema = new Schema(
    {
        month: { type: String, required: true },
        year: { type: Number, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        recordedBy: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
        payer: { type: Schema.Types.ObjectId, required: true, ref: 'Accounts' },
    },
    { timestamps: true },
);

export default mongoose.model<IDues>('Dues', DuesSchema);
