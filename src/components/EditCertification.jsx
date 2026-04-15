import { useEffect, useState } from "react";
import axios from "axios";
import "../style/creationArticle.css";
import "../style/EditArticle.css";

export default function EditCertification({ certificationId, onBack, onSaved }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("en cours");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertification() {
      try {
        const res = await axios.get(`http://localhost:3000/certifications/${certificationId}`);
        const certification = res.data;
        setTitle(certification.title || "");
        setAuthor(certification.author || "");
        setLink(certification.link || "");
        setStatus(certification.status || "en cours");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (certificationId) {
      loadCertification();
    }
  }, [certificationId]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/certifications/${certificationId}`, {
        title,
        author,
        link,
        status,
      });

      alert("Certification mise à jour");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour la certification.");
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="cms-card">
      <h1 className="cms-title">Modifier la certification</h1>

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

      <div className="cms-buttons">
        <button className="cms-button" onClick={handleSubmit}>
          Mettre à jour
        </button>
        <button className="cms-button-secondary" onClick={onBack}>
          Annuler
        </button>
      </div>
    </div>
  );
}