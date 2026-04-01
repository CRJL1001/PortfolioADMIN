import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Carousel } from "react-bootstrap";
import "../style/articleDetail.css";

export default function ArticleDetail({ articleId, onBack, onEdit }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/articles/${articleId}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [articleId]);

  if (!article) return <p>Chargement...</p>;

  function handleDelete() {
    if (window.confirm("Supprimer cet article ?")) {
      axios.delete(`http://localhost:3000/articles/${articleId}`)
        .then(() => onBack())
        .catch(err => console.error(err));
    }
  }

  return (
    <Container className="mt-4">

      <Button variant="secondary" className="mb-3" onClick={onBack}>
        ← Retour
      </Button>

      <Card className="shadow-sm">

        {/* --- CARROUSEL D'IMAGES --- */}
        {article.images?.length > 0 && (
          <Carousel>
            {article.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  className=""
                  style={{ height: "350px", objectFit: "cover" }}
                  alt=""
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        <Card.Body>
          <h1>{article.title}</h1>

          <p className="text-primary fw-bold">{article.category}</p>

          <p className="text-muted">
            Publié le : {new Date(article.createdAt).toLocaleDateString("fr-FR")}
          </p>

          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="d-flex gap-3 mt-4">
            <Button variant="warning" onClick={() => onEdit(articleId)}>
              Modifier
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
