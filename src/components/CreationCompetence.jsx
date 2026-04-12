import { useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";

export default function CreationCompetence() {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("debutant");
    const [category, setCategory] = useState("autre");

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/competences", {
                name,
                level,
                category,
            });
            alert("Compétence créée avec succès");
            // Reset form
            setName("");
            setLevel("debutant");
            setCategory("autre");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création de la compétence");
        }
    };

    return (
        <div className="cms-card">
            <h1 className="cms-title">Créer une compétence</h1>

            <div className="cms-group">
                <label>Nom de la compétence</label>
                <input
                    type="text"
                    placeholder="Ex: JavaScript, React, Node.js..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Niveau</label>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <option value="debutant">Débutant</option>
                    <option value="en cours">En cours</option>
                    <option value="Acquis">Acquis</option>
                </select>
            </div>

            <div className="cms-group">
                <label>Catégorie</label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="WEB">Développement Web</option>
                    <option value="modelisation3D">Modélisation 3D</option>
                    <option value="jeuxvideo">Développement de Jeux</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <button onClick={handleSubmit} className="cms-btn">
                Créer la compétence
            </button>
        </div>
    );
};