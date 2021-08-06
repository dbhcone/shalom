import mongoose, {Schema} from 'mongoose';
import { IDues } from '../interfaces/dues.interface';

const DuesSchema: Schema = new Schema({
    month: {type: String, required: true},
    year: {type: Number, required: true},
    amount: {type: Number, required: true},
    role: {type: String, required: true, default: 'member'},
    recordedBy: { type: Schema.Types.ObjectId, required: true },
    payer: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IDues>('Dues', DuesSchema);