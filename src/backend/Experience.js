import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
    title : { type: String, required: true },
    location : { type: String, required: true },
    date : { type: String, required: true },
    description : { type: String, required: true },
});

export const Experience = mongoose.model("Experience", ExperienceSchema);