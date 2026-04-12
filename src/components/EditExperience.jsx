import { useEffect, useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";
import "../style/EditArticle.css";

export default function EditExperience({ experienceId, onBack, onSaved }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperience() {
      try {
        const res = await axios.get(`http://localhost:3000/experiences/${experienceId}`);
        const experience = res.data;
        setTitle(experience.title || "");
        setLocation(experience.location || "");
        setDate(experience.date || "");
        setDescription(experience.description || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (experienceId) {
      loadExperience();
    }
  }, [experienceId]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/experiences/${experienceId}`, {
        title,
        location,
        date,
        description,
      });

      alert("Expérience mise à jour");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour l'expérience.");
    }
  };

  if (loading) {
    return <p>Chargement de l'expérience...</p>;
  }

  return (
    <div className="cms-card">
      <h1 className="cms-title">Modifier l'expérience</h1>

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