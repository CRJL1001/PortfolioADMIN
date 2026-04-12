import { useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";

export default function CreationDiplome() {
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/diplomes", {
        title,
        institution,
        date,
        description,
      });
      alert("Diplôme créé avec succès");
      setTitle("");
      setInstitution("");
      setDate("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du diplôme");
    }
  };

  return (
    <div className="cms-card">
      <h1 className="cms-title">Créer un diplôme</h1>

      <div className="cms-group">
        <label>Titre du diplôme</label>
        <input
          type="text"
          placeholder="Titre du diplôme"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="cms-group">
        <label>Établissement</label>
        <input
          type="text"
          placeholder="Nom de l'établissement"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />
      </div>

      <div className="cms-group">
        <label>Date</label>
        <input
          type="text"
          placeholder="Ex: 2023"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="cms-group">
        <label>Description</label>
        <textarea
          placeholder="Description du diplôme"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </div>

      <button onClick={handleSubmit} className="cms-btn">
        Créer le diplôme
      </button>
    </div>
  );
}
