import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    emailVerificationToken: string | null;
    emailVerificationExpires: Date | null;
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

export interface IShare extends Document {
    note: INote['_id'];
    owner: IUser['_id'];
    sharedWith: string;
    sharedUser: IUser['_id'] | null;
    permission: 'read' | 'write';
    status: 'pending' | 'approved' | 'rejected';
    requestMessage: string | null;
    isDirectShare: boolean;
    createdAt: Date;
    updatedAt: Date;
}