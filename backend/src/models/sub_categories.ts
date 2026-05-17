import mongoose, {model, Schema } from 'mongoose';


export interface ISubCategory {
    id: string;
    name: string;
    category_id: String;
}

const subCategorySchema = new Schema<ISubCategory>({
    id: {
        type: String,
        required: [true, 'SubCategory id is required'],
        unique: true,
        minlength: [1, 'ID must be at least 1 characters'],
        maxlength: [10, 'ID cannot exceed 10 characters'],
        trim: true  
    },
    name: { 
        type: String,
        required: [true, 'SubCategory name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [20, 'Name cannot exceed 20 characters'],   
        trim: true
    },
    category_id: {
        type: String,
        ref: 'Category',
        required: [true, 'Category ID is required']
    }       
})

export const SubCategory = model<ISubCategory>('SubCategory', subCategorySchema); 