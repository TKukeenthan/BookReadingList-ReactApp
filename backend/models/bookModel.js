import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: false,
        },
        genre: {
            type: String,
            required: false,
        },
        isbn: {
            type: String,
            required: false,
        },
        image: {
            type: String, // Assuming the image is stored as a file path
            default: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
        },
        note: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            default: 'Start', // Set default value to false if not provided
        },
        completeDate: {
            type: Date,
            default: null, // Set default value to null if not provided
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);
