import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import "../style/ArticleDetail.css";

export default function ExperienceDetail({ experienceId, onBack, onEdit }) {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperience() {
      try {
        const res = await axios.get(`http://localhost:3000/experiences/${experienceId}`);
        setExperience(res.data);
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

  if (loading) {
    return <p>Chargement de l'expérience...</p>;
  }

  if (!experience) {
    return <p>Expérience non trouvée.</p>;
  }

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={onBack} className="mb-3">
        ← Retour
      </Button>

      <Card>
        <Card.Body>
          <Card.Title as="h1">{experience.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {experience.location} - {experience.date}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
            {experience.description}
          </Card.Text>
          <Button variant="primary" onClick={() => onEdit(experienceId)}>
            Modifier
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}