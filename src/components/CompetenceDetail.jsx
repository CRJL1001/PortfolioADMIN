import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Badge } from "react-bootstrap";
import "../style/ArticleDetail.css";

export default function CompetenceDetail({ competenceId, onBack, onEdit }) {
  const [competence, setCompetence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompetence() {
      try {
        const res = await axios.get(`http://localhost:3000/competences/${competenceId}`);
        setCompetence(res.data);
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

  const getCategoryLabel = (category) => {
    switch (category) {
      case "WEB": return "Développement Web";
      case "modelisation3D": return "Modélisation 3D";
      case "jeuxvideo": return "Développement de Jeux";
      case "autre": return "Autre";
      default: return category;
    }
  };

  const getLevelBadgeVariant = (level) => {
    switch (level) {
      case "Acquis":
        return "success";
      case "en cours":
        return "warning";
      case "debutant":
        return "secondary";
      default:
        return "primary";
    }
  };

  if (loading) {
    return <p>Chargement de la compétence...</p>;
  }

  if (!competence) {
    return <p>Compétence non trouvée.</p>;
  }

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={onBack} className="mb-3">
        ← Retour
      </Button>

      <Card>
        <Card.Body>
          <Card.Title as="h1">{competence.name}</Card.Title>
          <Card.Subtitle className="mb-2">
            <Badge bg={getLevelBadgeVariant(competence.level)} className="me-2">
              Niveau: {competence.level}
            </Badge>
            <Badge bg="info">
              Catégorie: {getCategoryLabel(competence.category)}
            </Badge>
          </Card.Subtitle>
          <Button variant="primary" onClick={() => onEdit(competenceId)}>
            Modifier
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}