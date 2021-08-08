import {Document} from 'mongoose'

export interface IAccount extends Document {
    email:string;
    surname: string;
    firstName: string;
    otherNames?: string;
    gender: string;
    primaryMobileNumber: string;
    otherNumbers: string[];
    occupation: string;
}
 