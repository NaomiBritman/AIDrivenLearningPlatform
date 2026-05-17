import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
    id: string;
    name: string;
    phone: string;
}

const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: [true, 'User id is required'],
        unique: true,
        minlength: [9, 'ID must be at least 9 characters'],
        maxlength: [9, 'ID cannot exceed 9 characters'],
        trim: true
    },
    name: { 
        type: String,
        required: [true, 'User name is required'],
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true
    },
    phone: { 
        type: String,
        required: [true, 'User phone is required'],
        minlength: [10, 'Phone must be at least 10 characters'],
        maxlength: [15, 'Phone cannot exceed 15 characters'],
        trim: true
    }
});
export const User = model<IUser>('User', userSchema);