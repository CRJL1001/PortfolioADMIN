import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect("");
        console.log("connecté à MongoDB Atlas");
    }catch (err) {
        console.error("Erreur de connexion à MongoDB Atlas", err);
    }
}
