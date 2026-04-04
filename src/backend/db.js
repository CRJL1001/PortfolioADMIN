import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect("mongodb+srv://admin:GeralD91365--@portfoliobase.hdqjx7y.mongodb.net/?appName=Portfoliobase");
        console.log("connecté à MongoDB Atlas");
    }catch (err) {
        console.error("Erreur de connexion à MongoDB Atlas", err);
    }
}