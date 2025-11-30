import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    data: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true
    },
}, {
    timestamps: true,
});

// Indexes for performance
submissionSchema.index({ formId: 1, createdAt: -1 });

export const SubmissionModel = mongoose.model('Submission', submissionSchema);
