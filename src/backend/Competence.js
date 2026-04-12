import mongoose from "mongoose";

const CompetenceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: {
        type: String,
        required: true,
        enum: ["Acquis", "en cours", "debutant"]
    },
    category: {
        type: String,
        required: true,
        enum: ["modelisation3D", "WEB", "jeuxvideo", "autre"]
    },
});

export const Competence = mongoose.model("Competence", CompetenceSchema); 