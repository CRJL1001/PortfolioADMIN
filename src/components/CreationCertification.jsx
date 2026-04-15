import { useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";

export default function CreationCertification() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState("en cours");

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/certifications", {
                title,
                author,
                link,
                status,
            });
            alert("Certification créée avec succès");
            // Reset form
            setTitle("");
            setAuthor("");
            setLink("");
            setStatus("en cours");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création de la certification");
        }
    };

    return (
        <div className="cms-card">
            <h1 className="cms-title">Créer une certification</h1>

            <div className="cms-group">
                <label>Titre</label>
                <input
                    type="text"
                    placeholder="Titre de la certification"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Auteur</label>
                <input
                    type="text"
                    placeholder="Auteur de la certification"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Lien</label>
                <input
                    type="url"
                    placeholder="Lien vers la certification"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>

            <div className="cms-group">
                <label>Statut</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="en cours">En cours</option>
                    <option value="acquis">Acquis</option>
                </select>
            </div>

            <button className="cms-button" onClick={handleSubmit}>
                Créer la certification
            </button>
        </div>
    );
}