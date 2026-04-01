import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export const Article = mongoose.model("Article", ArticleSchema);