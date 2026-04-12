import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "../style/pageArticle.css";

export default function PageCompetence({ onSelectCompetence, onEditCompetence }) {
  const [competences, setCompetences] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/competences")
      .then(res => setCompetences(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
      try {
        await axios.delete(`http://localhost:3000/competences/${id}`);
        setCompetences(competences.filter(comp => comp._id !== id));
        alert("Compétence supprimée");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "WEB": return "Web";
      case "modelisation3D": return "3D";
      case "jeuxvideo": return "Jeux";
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

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Toutes les compétences</h1>

      <Row>
        {competences.map(competence => (
          <Col md={6} lg={4} key={competence._id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{competence.name}</Card.Title>
                <Card.Subtitle className="mb-2">
                  <Badge bg={getLevelBadgeVariant(competence.level)} className="me-1">
                    {competence.level}
                  </Badge>
                  <Badge bg="secondary">
                    {getCategoryLabel(competence.category)}
                  </Badge>
                </Card.Subtitle>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => onSelectCompetence(competence._id)}
                  >
                    Voir détails
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onEditCompetence(competence._id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(competence._id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}