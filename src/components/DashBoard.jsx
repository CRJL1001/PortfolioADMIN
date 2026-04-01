import Sidebar from "../components/Sidebar";
import CreationArticle from "./CreationArticle";
import "../style/dashboard.css";
import { useState } from "react";
import PageArticle from "./PageArticle";
import ArticleDetail from "./ArticleDetail";

export default function DashBoard() {
    const [currentPage, setCurrentPage] = useState("create");
    const [selectedArticleId, setSelectedArticleId] = useState(null);


    function handlePageChange(page) {
        setCurrentPage((old) => page);
    }

    function handleSelectArticle(id) {
        setSelectedArticleId((old) => id);
        setCurrentPage("detail");
    }

  return (
    <div className="dashboard">
      <Sidebar onPageChange={handlePageChange} activePage={currentPage} />
      <main className="dashboard-content">
        {currentPage === "create" && <CreationArticle />}   
        {currentPage === "articles" && <PageArticle  onSelectArticle={handleSelectArticle}/>}    
        {currentPage === "detail" && (
          <ArticleDetail 
            articleId={selectedArticleId}
            onBack={() => setCurrentPage("articles")}
          />
        )} 
      </main>
    </div>
  );
}
