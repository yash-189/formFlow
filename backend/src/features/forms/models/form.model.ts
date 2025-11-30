import mongoose from 'mongoose';

const fieldOptionSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
});

const fieldValidationSchema = new mongoose.Schema({
    required: { type: Boolean, default: false },
    min: Number,
    max: Number,
    minLength: Number,
    maxLength: Number,
    pattern: String,
    minDate: Date,
});

const formFieldSchema = new mongoose.Schema({
    id: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'select', 'multi-select', 'date', 'textarea', 'switch', 'file']
    },
    label: { type: String, required: true },
    placeholder: String,
    required: { type: Boolean, default: false },
    options: [fieldOptionSchema],
    validation: fieldValidationSchema,
});

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    fields: [formFieldSchema],
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export const FormModel = mongoose.model('Form', formSchema);
