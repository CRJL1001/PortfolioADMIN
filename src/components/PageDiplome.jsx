import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../style/pageArticle.css";

export default function PageDiplome({ onSelectDiplome, onEditDiplome }) {
  const [diplomes, setDiplomes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/diplomes")
      .then(res => setDiplomes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce diplôme ?")) {
      try {
        await axios.delete(`http://localhost:3000/diplomes/${id}`);
        setDiplomes(diplomes.filter(d => d._id !== id));
        alert("Diplôme supprimé");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Tous les diplômes</h1>

      <Row>
        {diplomes.map((diplome) => (
          <Col md={6} lg={4} key={diplome._id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{diplome.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {diplome.institution} - {diplome.date}
                </Card.Subtitle>
                <Card.Text>
                  {diplome.description.length > 120
                    ? diplome.description.slice(0, 120) + "..."
                    : diplome.description}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={() => onSelectDiplome(diplome._id)}>
                    Voir détail
                  </Button>
                  <Button variant="secondary" onClick={() => onEditDiplome(diplome._id)}>
                    Modifier
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(diplome._id)}>
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
