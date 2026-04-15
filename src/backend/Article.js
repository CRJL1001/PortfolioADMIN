import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["web", "3D", "game", "app", "other"],
    },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export const Article = mongoose.model("Article", ArticleSchema);