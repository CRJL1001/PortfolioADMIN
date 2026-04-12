import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import "../style/ArticleDetail.css";

export default function DiplomeDetail({ diplomeId, onBack, onEdit }) {
  const [diplome, setDiplome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDiplome() {
      try {
        const res = await axios.get(`http://localhost:3000/diplomes/${diplomeId}`);
        setDiplome(res.data);
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

  if (loading) {
    return <p>Chargement du diplôme...</p>;
  }
  if (!diplome) {
    return <p>Diplôme non trouvé.</p>;
  }

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={onBack} className="mb-3">
        ← Retour
      </Button>
      <Card>
        <Card.Body>
          <Card.Title as="h1">{diplome.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {diplome.institution} - {diplome.date}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
            {diplome.description}
          </Card.Text>
          <Button variant="primary" onClick={() => onEdit(diplomeId)}>
            Modifier
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
