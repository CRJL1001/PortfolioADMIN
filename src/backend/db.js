import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
        console.log("connecté à MongoDB"); 
    }catch (err) {
        console.error("Erreur de connexion à MongoDB", err);
    }
}