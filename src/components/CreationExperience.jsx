import { useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";

export default function CreationExperience() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/experiences", {
                title,
                location,
                date,
                description,
            });
            alert("Expérience créée avec succès");
            // Reset form
            setTitle("");
            setLocation("");
            setDate("");
            setDescription("");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création de l'expérience");
        }
    };

    return (
        <div className="cms-card">
            <h1 className="cms-title">Créer une expérience</h1>

            <div className="cms-group">
                <label>Titre</label>
                <input
                    type="text"
                    placeholder="Titre de l'expérience"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Lieu</label>
                <input
                    type="text"
                    placeholder="Lieu de l'expérience"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Date</label>
                <input
                    type="text"
                    placeholder="Date (ex: Janvier 2023 - Mars 2023)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Description</label>
                <textarea
                    placeholder="Description de l'expérience"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                />
            </div>

            <button onClick={handleSubmit} className="cms-btn">
                Créer l'expérience
            </button>
        </div>
    );
};