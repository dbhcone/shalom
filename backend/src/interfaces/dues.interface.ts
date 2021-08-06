import { Document } from "mongoose";
import { IUser } from "./user.interface";
import { IAccount } from "./account.interface";

export interface IDues extends Document {
    amount: number;
    recordedBy: IUser["_id"];
    payer: IAccount["_id"];
    year: number;
    month: string;
}