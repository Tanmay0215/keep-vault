import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface INote extends Document {
    title: string;
    content: string;
    user: IUser['_id'];
    createdAt: Date;
    updatedAt: Date;
}
