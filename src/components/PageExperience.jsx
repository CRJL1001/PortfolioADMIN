import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../style/pageArticle.css";

export default function PageExperience({ onSelectExperience, onEditExperience }) {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/experiences")
      .then(res => setExperiences(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
      try {
        await axios.delete(`http://localhost:3000/experiences/${id}`);
        setExperiences(experiences.filter(exp => exp._id !== id));
        alert("Expérience supprimée");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Toutes les expériences</h1>

      <Row>
        {experiences.map(experience => (
          <Col md={6} lg={4} key={experience._id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{experience.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {experience.location} - {experience.date}
                </Card.Subtitle>
                <Card.Text>
                  {experience.description.length > 100
                    ? experience.description.substring(0, 100) + "..."
                    : experience.description}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => onSelectExperience(experience._id)}
                  >
                    Voir détails
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onEditExperience(experience._id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(experience._id)}
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