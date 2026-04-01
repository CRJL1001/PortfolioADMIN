import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../style/pageArticle.css";
import MyCard from "./MyCard";

export default function PageArticle({ onSelectArticle }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/articles")
      .then(res => setArticles(res.data));
  }, []);

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Tous les articles</h1>

      <Row>
        {articles.map(article => (
          <MyCard key={article._id} article={article} onSelectArticle={onSelectArticle} />
        ))}
      </Row>
    </Container>
  );
}
