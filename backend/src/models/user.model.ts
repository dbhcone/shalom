import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'member' },
    accountOwner: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'Accounts' },
    profilePhoto: { type: Object },
});

export default mongoose.model<IUser>('Users', UserSchema);
