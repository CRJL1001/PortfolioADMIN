import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Badge } from "react-bootstrap";
import "../style/ArticleDetail.css";

export default function CertificationDetail({ certificationId, onBack, onEdit }) {
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertification() {
      try {
        const res = await axios.get(`http://localhost:3000/certifications/${certificationId}`);
        setCertification(res.data);
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

  if (loading) {
    return <p>Chargement de la certification...</p>;
  }

  if (!certification) {
    return <p>Certification non trouvée.</p>;
  }

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={onBack} className="mb-3">
        ← Retour
      </Button>

      <Card>
        <Card.Body>
          <Card.Title as="h1">{certification.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Auteur: {certification.author}
          </Card.Subtitle>
          <Card.Text>
            <strong>Lien:</strong> <a href={certification.link} target="_blank" rel="noopener noreferrer">{certification.link}</a>
          </Card.Text>
          <Badge bg={certification.status === "acquis" ? "success" : "warning"}>
            Statut: {certification.status}
          </Badge>
          <div className="mt-3">
            <Button variant="primary" onClick={() => onEdit(certificationId)}>
              Modifier
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}