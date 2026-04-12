import { useEffect, useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";
import "../style/EditArticle.css";

export default function EditDiplome({ diplomeId, onBack, onSaved }) {
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDiplome() {
      try {
        const res = await axios.get(`http://localhost:3000/diplomes/${diplomeId}`);
        const diplome = res.data;
        setTitle(diplome.title || "");
        setInstitution(diplome.institution || "");
        setDate(diplome.date || "");
        setDescription(diplome.description || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (diplomeId) {
      loadDiplome();
    }
  }, [diplomeId]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/diplomes/${diplomeId}`, {
        title,
        institution,
        date,
        description,
      });
      alert("Diplôme mis à jour");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour le diplôme.");
    }
  };

  if (loading) {
    return <p>Chargement du diplôme...</p>;
  }

  return (
    <div className="cms-card">
      <h1 className="cms-title">Modifier le diplôme</h1>

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
