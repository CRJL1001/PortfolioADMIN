import { Col, Card } from "react-bootstrap";
import "../style/MyCard.css"; 

export default function MyCard({ article, onSelectArticle }) {

    return (
        <Col 
            key={article._id}
            xs={12} sm={6} md={4} lg={3}   // ← RESPONSIVE AUTOMATIQUE
            className="mb-4"
          >
            <Card 
              onClick={() => onSelectArticle(article._id)}
              style={{ cursor: "pointer" }}
              className="shadow-sm"
            >
              {article.images?.length > 0 && (
                <Card.Img 
                  variant="top" 
                  src={article.images[0]} 
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}

              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="">
                  {article.category}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

    );
}