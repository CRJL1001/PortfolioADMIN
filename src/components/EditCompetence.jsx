import { useEffect, useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";
import "../style/EditArticle.css";

export default function EditCompetence({ competenceId, onBack, onSaved }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("debutant");
  const [category, setCategory] = useState("autre");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompetence() {
      try {
        const res = await axios.get(`http://localhost:3000/competences/${competenceId}`);
        const competence = res.data;
        setName(competence.name || "");
        setLevel(competence.level || "debutant");
        setCategory(competence.category || "autre");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (competenceId) {
      loadCompetence();
    }
  }, [competenceId]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/competences/${competenceId}`, {
        name,
        level,
        category,
      });

      alert("Compétence mise à jour");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour la compétence.");
    }
  };

  if (loading) {
    return <p>Chargement de la compétence...</p>;
  }

  return (
    <div className="cms-card">
      <h1 className="cms-title">Modifier la compétence</h1>

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
      <div className="cms-buttons">
        <button onClick={handleSubmit} className="cms-btn marge-btn">
          Enregistrer
        </button>
        <button type="button" onClick={onBack} className="cms-btn cms-btn-secondary">
          Annuler
        </button>
      </div>
    </div>
  );
}