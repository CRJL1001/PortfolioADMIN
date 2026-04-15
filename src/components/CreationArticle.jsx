import { useState } from "react"; 
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import "../style/creationArticle.css";

export default function CreationArticle() { 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("web");
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((old) => [...old, ...files]);
    }; 

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);

        images.forEach((img) => {
            formData.append("images", img);
        }); 

        await axios.post("http://localhost:3000/articles", formData); 
        alert("Article publié"); 
    };

    return (
        <div className="cms-card">
            <h1 className="cms-title">Créer un article</h1>

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
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="web">Web</option>
                    <option value="3D">3D</option>
                    <option value="game">Game</option>
                    <option value="app">App</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="cms-group">
                <label>Contenu</label>
                <ReactQuill value={content} onChange={setContent} />
            </div>

            <div className="cms-group">
                <label>Images</label>
                <input 
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                <div className="cms-preview">
                    {images.map((img, i) => (
                        <img key={i} src={URL.createObjectURL(img)} alt="" />
                    ))}
                </div>
            </div>

            <button onClick={handleSubmit} className="cms-btn">
                Publier l'article
            </button>
        </div>
    ); 
};
