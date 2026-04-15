import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    link: { type: String, required: true },
    status: { type: String, enum: ["en cours", "acquis"], required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Certification = mongoose.model("Certification", CertificationSchema);