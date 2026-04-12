import Sidebar from "../components/Sidebar";
import CreationArticle from "./CreationArticle";
import EditArticle from "./EditArticle";
import "../style/dashboard.css";
import { useState } from "react";
import PageArticle from "./PageArticle";
import ArticleDetail from "./ArticleDetail";
import CreationExperience from "./CreationExperience";
import PageExperience from "./PageExperience";
import ExperienceDetail from "./ExperienceDetail";
import EditExperience from "./EditExperience";

export default function DashBoard() {
    const [currentPage, setCurrentPage] = useState("create");
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [selectedExperienceId, setSelectedExperienceId] = useState(null);


    function handlePageChange(page) {
        setCurrentPage((old) => page);
    }

    function handleSelectArticle(id) {
        setSelectedArticleId((old) => id);
        setCurrentPage("detail");
    }

    function handleEditArticle(id) {
        setSelectedArticleId(id);
        setCurrentPage("edit");
    }

    function handleSelectExperience(id) {
        setSelectedExperienceId(id);
        setCurrentPage("experienceDetail");
    }

    function handleEditExperience(id) {
        setSelectedExperienceId(id);
        setCurrentPage("editExperience");
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
            onEdit={handleEditArticle}
          />
        )}
        {currentPage === "edit" && (
          <EditArticle
            articleId={selectedArticleId}
            onBack={() => setCurrentPage("detail")}
            onSaved={() => setCurrentPage("detail")}
          />
        )}
        {currentPage === "createExperience" && <CreationExperience />}
        {currentPage === "experiences" && (
          <PageExperience
            onSelectExperience={handleSelectExperience}
            onEditExperience={handleEditExperience}
          />
        )}
        {currentPage === "experienceDetail" && (
          <ExperienceDetail
            experienceId={selectedExperienceId}
            onBack={() => setCurrentPage("experiences")}
            onEdit={handleEditExperience}
          />
        )}
        {currentPage === "editExperience" && (
          <EditExperience
            experienceId={selectedExperienceId}
            onBack={() => setCurrentPage("experienceDetail")}
            onSaved={() => setCurrentPage("experienceDetail")}
          />
        )}
      </main>
    </div>
  );
}
