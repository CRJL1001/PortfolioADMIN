import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "../style/pageArticle.css";

export default function PageCertification({ onSelectCertification, onEditCertification }) {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/certifications")
      .then(res => setCertifications(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette certification ?")) {
      try {
        await axios.delete(`http://localhost:3000/certifications/${id}`);
        setCertifications(certifications.filter(cert => cert._id !== id));
        alert("Certification supprimée");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Toutes les certifications</h1>

      <Row>
        {certifications.map(certification => (
          <Col md={6} lg={4} key={certification._id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{certification.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Auteur: {certification.author}
                </Card.Subtitle>
                <Card.Text>
                  <a href={certification.link} target="_blank" rel="noopener noreferrer">
                    Lien vers la certification
                  </a>
                </Card.Text>
                <Card.Text>
                  Catégorie: {certification.category}
                </Card.Text>
                <Badge bg={certification.status === "acquis" ? "success" : "warning"}>
                  {certification.status}
                </Badge>
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    onClick={() => onSelectCertification(certification._id)}
                  >
                    Voir détails
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onEditCertification(certification._id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(certification._id)}
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