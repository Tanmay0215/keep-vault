import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Note extends Document {
    title: string;
    content: string;
    user: User['_id'];
    createdAt: Date;
    updatedAt: Date;
}
