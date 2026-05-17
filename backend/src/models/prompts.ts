import mongoose, { model ,Schema } from "mongoose";


export interface IPrompt {
    id: string;
    user_id: String;
    category_id: String;
    sub_category_id: String;
    prompt: string;
    response: string;
    created_at: Date;
}

const promptSchema = new Schema<IPrompt>({
    id: {
        type: String,
        required: [true, 'Prompt id is required'],
        minlength: [1, 'ID must be at least 1 characters'],
        maxlength: [20, 'ID cannot exceed 20 characters'],
        trim: true
    },
    user_id: {
        type: String,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    category_id: {  
        type: String,
        ref: 'Category',
        required: [true, 'Category ID is required']
    },
    sub_category_id: {
        type: String,
        ref: 'SubCategory',
        required: [true, 'SubCategory ID is required']
    },
    prompt: { 
        type: String,
        required: [true, 'Prompt text is required'],
        minlength: [5, 'Prompt must be at least 5 characters'],
        maxlength: [500, 'Prompt cannot exceed 500 characters'],
    },
    response: {
        type: String,
        required: [true, 'Response text is required'],
        minlength: [5, 'Response must be at least 5 characters'],
        maxlength: [5000, 'Response cannot exceed 5000 characters'],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Prompt = model<IPrompt>('Prompt', promptSchema);