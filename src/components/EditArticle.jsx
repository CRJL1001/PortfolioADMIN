import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import "../style/creationArticle.css";
import "../style/EditArticle.css";

export default function EditArticle({ articleId, onBack, onSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("web");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await axios.get(`http://localhost:3000/articles/${articleId}`);
        const article = res.data;
        setTitle(article.title || "");
        setContent(article.content || "");
        setCategory(article.category || "web");
        setExistingImages(article.images || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((old) => [...old, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((old) => old.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      newImages.forEach((img) => {
        formData.append("images", img);
      });

      await axios.put(`http://localhost:3000/articles/${articleId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Article mis à jour");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour l'article.");
    }
  };

  if (loading) {
    return <p>Chargement de l'article...</p>;
  }

  return (
    <div className="cms-card">
      <h1 className="cms-title">Modifier l'article</h1>

      <div className="cms-group">
        <label>Titre</label>
        <input
          type="text"
          placeholder="Titre de l'article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="cms-group">
        <label>Catégorie</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="web">Développement Web</option>
          <option value="3D">Modélisation 3D</option>
          <option value="game">Développement de Jeux</option>
          <option value="highlight">Mis en avant</option>
        </select>
      </div>

      <div className="cms-group">
        <label>Contenu</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>

      <div className="cms-group">
        <label>Images existantes</label>
        <div className="cms-preview">
          {existingImages.length === 0 && <p>Aucune image pour cet article.</p>}
          {existingImages.map((img, i) => (
            <img key={i} src={img} alt={`article-${i}`} />
          ))}
        </div>
      </div>

      <div className="cms-group">
        <label>Ajouter des images</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        <div className="cms-preview">
          {newImages.map((img, i) => (
            <div key={i} className="cms-preview-item">
              <img src={URL.createObjectURL(img)} alt="new" />
              <button type="button" onClick={() => handleRemoveNewImage(i)}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
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
