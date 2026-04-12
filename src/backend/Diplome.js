import mongoose from "mongoose";

const diplomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    institution: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
});

export const Diplome = mongoose.model("Diplome", diplomeSchema);