import mongoose from "mongoose";

const facultiesSchema = new mongoose.Schema({
    faculty: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const faculties = mongoose.models['faculties'] || mongoose.model('faculties', facultiesSchema)