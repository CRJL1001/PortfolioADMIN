import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import { Article } from './Article.js';
import { Experience } from './Experience.js';
import { Competence } from './Competence.js';
import { Diplome } from './Diplome.js';
import { Certification } from './Certification.js';
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

// Routes pour les expériences

// Créer une expérience
app.post("/experiences", async (req, res) => {
    try {
        const { title, location, date, description } = req.body;

        const newExperience = new Experience({
            title,
            location,
            date,
            description,
        });

        await newExperience.save();

        res.json({ success: true, experience: newExperience });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer toutes les expériences
app.get("/experiences", async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ date: -1 });
        res.json(experiences);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer une expérience par ID
app.get("/experiences/:id", async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ success: false, message: "Expérience non trouvée" });
        }
        res.json(experience);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Modifier une expérience
app.put("/experiences/:id", async (req, res) => {
    try {
        const { title, location, date, description } = req.body;
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ success: false, message: "Expérience non trouvée" });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            { title, location, date, description },
            { returnDocument: 'after' }
        );
        res.json({ success: true, experience: updatedExperience });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Supprimer une expérience
app.delete("/experiences/:id", async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ success: false, message: "Expérience non trouvée" });
        }
        res.json({ success: true, message: "Expérience supprimée" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Routes pour les compétences

// Créer une compétence
app.post("/competences", async (req, res) => {
    try {
        const { name, level, category } = req.body;

        const newCompetence = new Competence({
            name,
            level,
            category,
        });

        await newCompetence.save();

        res.json({ success: true, competence: newCompetence });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer toutes les compétences
app.get("/competences", async (req, res) => {
    try {
        const competences = await Competence.find().sort({ name: 1 });
        res.json(competences);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer une compétence par ID
app.get("/competences/:id", async (req, res) => {
    try {
        const competence = await Competence.findById(req.params.id);
        if (!competence) {
            return res.status(404).json({ success: false, message: "Compétence non trouvée" });
        }
        res.json(competence);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Modifier une compétence
app.put("/competences/:id", async (req, res) => {
    try {
        const { name, level, category } = req.body;
        const competence = await Competence.findById(req.params.id);
        if (!competence) {
            return res.status(404).json({ success: false, message: "Compétence non trouvée" });
        }

        const updatedCompetence = await Competence.findByIdAndUpdate(
            req.params.id,
            { name, level, category },
            { returnDocument: 'after' }
        );
        res.json({ success: true, competence: updatedCompetence });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Supprimer une compétence
app.delete("/competences/:id", async (req, res) => {
    try {
        const competence = await Competence.findByIdAndDelete(req.params.id);
        if (!competence) {
            return res.status(404).json({ success: false, message: "Compétence non trouvée" });
        }
        res.json({ success: true, message: "Compétence supprimée" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Routes pour les diplômes

app.post("/diplomes", async (req, res) => {
    try {
        const { title, institution, date, description } = req.body;
        const newDiplome = new Diplome({
            title,
            institution,
            date,
            description,
        });
        await newDiplome.save();
        res.json({ success: true, diplome: newDiplome });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.get("/diplomes", async (req, res) => {
    try {
        const diplomes = await Diplome.find().sort({ date: -1 });
        res.json(diplomes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.get("/diplomes/:id", async (req, res) => {
    try {
        const diplome = await Diplome.findById(req.params.id);
        if (!diplome) {
            return res.status(404).json({ success: false, message: "Diplôme non trouvé" });
        }
        res.json(diplome);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.put("/diplomes/:id", async (req, res) => {
    try {
        const { title, institution, date, description } = req.body;
        const diplome = await Diplome.findById(req.params.id);
        if (!diplome) {
            return res.status(404).json({ success: false, message: "Diplôme non trouvé" });
        }
        const updatedDiplome = await Diplome.findByIdAndUpdate(
            req.params.id,
            { title, institution, date, description },
            { returnDocument: 'after' }
        );
        res.json({ success: true, diplome: updatedDiplome });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.delete("/diplomes/:id", async (req, res) => {
    try {
        const diplome = await Diplome.findByIdAndDelete(req.params.id);
        if (!diplome) {
            return res.status(404).json({ success: false, message: "Diplôme non trouvé" });
        }
        res.json({ success: true, message: "Diplôme supprimé" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Routes pour les certifications

// Créer une certification
app.post("/certifications", async (req, res) => {
    try {
        const { title, author, link, status } = req.body;

        const newCertification = new Certification({
            title,
            author,
            link,
            status,
        });

        await newCertification.save();

        res.json({ success: true, certification: newCertification });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer toutes les certifications
app.get("/certifications", async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ createdAt: -1 });
        res.json(certifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer une certification par ID
app.get("/certifications/:id", async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification non trouvée" });
        }
        res.json(certification);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Modifier une certification
app.put("/certifications/:id", async (req, res) => {
    try {
        const { title, author, link, status } = req.body;
        const certification = await Certification.findById(req.params.id);
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification non trouvée" });
        }

        const updatedCertification = await Certification.findByIdAndUpdate(
            req.params.id,
            { title, author, link, status },
            { returnDocument: 'after' }
        );
        res.json({ success: true, certification: updatedCertification });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Supprimer une certification
app.delete("/certifications/:id", async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification non trouvée" });
        }
        res.json({ success: true, message: "Certification supprimée" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.listen(3000, () => console.log("API sur le port 3000"));  