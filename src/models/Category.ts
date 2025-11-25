import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
            unique: true,
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug'],
            unique: true,
        },
        description: {
            type: String,
        },
        sequence: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt
    }
);

const Category = models.Category || model('Category', CategorySchema, 'Categories');

export default Category;
