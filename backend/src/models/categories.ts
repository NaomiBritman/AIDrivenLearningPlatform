import {model, Schema } from 'mongoose';

export interface ICategory {
    id:string;
    name: string;
}

const categorySchema = new Schema<ICategory>({
    id: {
        type: String,
        required: [true, 'Category id is required'],
        unique: true,
        minlength: [1, 'ID must be at least 1characters'],
        maxlength: [10, 'ID cannot exceed 10 characters'],
        trim: true
    },
    name: { 
        type: String,
        required: [true, 'Category name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [20, 'Name cannot exceed 20 characters'],
        trim: true
    },
})

export const Category = model<ICategory>('Category', categorySchema);