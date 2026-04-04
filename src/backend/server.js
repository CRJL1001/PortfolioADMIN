import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import { Article } from './Article.js';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary.js";

const app = express(); 
app.use(cors());
app.use(express.json());

//stockage cloud

const storage = new CloudinaryStorage({
    cloudinary, 
    params : {
        folder: "portfolio_articles",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"]
    }
});

export const upload = multer({ storage });  

//connexion mongoDB
connectDB();

//route d'upload 

app.post("/articles", upload.array("images"), async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const imageUrls = req.files.map(file => file.path);

        const newArticle = new Article({
            title,
            category,
            content,
            images: imageUrls,
        });

        await newArticle.save();

        res.json({ success : true, article : newArticle });
    }catch (err) {
        console.error(err); 
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}); 

//route de récupération de tout les articles
app.get("/articles", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
}); 

//route de récupération d'un article

app.get("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article non trouvé" });
        }
        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

//route de modification d'un article
app.put("/articles/:id", upload.array("images"), async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article non trouvé" });
        }

        const update = { title, category, content };
        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => file.path);
            update.images = [...article.images, ...imageUrls];
        }

        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, update, { returnDocument: 'after' });
        res.json({ success: true, article: updatedArticle });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

//route de suppression d'un article
app.delete("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article non trouvé" });
        }
        res.json({ success: true, message: "Article supprimé" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.listen(3000, () => console.log("API sur le port 3000"));  