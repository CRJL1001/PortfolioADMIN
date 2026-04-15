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
import CreationCompetence from "./CreationCompetence";
import PageCompetence from "./PageCompetence";
import CompetenceDetail from "./CompetenceDetail";
import EditCompetence from "./EditCompetence";
import CreationDiplome from "./CreationDiplome";
import PageDiplome from "./PageDiplome";
import DiplomeDetail from "./DiplomeDetail";
import EditDiplome from "./EditDiplome";
import CreationCertification from "./CreationCertification";
import PageCertification from "./PageCertification";
import CertificationDetail from "./CertificationDetail";
import EditCertification from "./EditCertification";

export default function DashBoard() {
    const [currentPage, setCurrentPage] = useState("create");
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [selectedExperienceId, setSelectedExperienceId] = useState(null);
    const [selectedCompetenceId, setSelectedCompetenceId] = useState(null);
    const [selectedDiplomeId, setSelectedDiplomeId] = useState(null);
    const [selectedCertificationId, setSelectedCertificationId] = useState(null);


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

    function handleSelectCompetence(id) {
        setSelectedCompetenceId(id);
        setCurrentPage("competenceDetail");
    }

    function handleEditCompetence(id) {
        setSelectedCompetenceId(id);
        setCurrentPage("editCompetence");
    }

    function handleSelectDiplome(id) {
        setSelectedDiplomeId(id);
        setCurrentPage("diplomeDetail");
    }

    function handleEditDiplome(id) {
        setSelectedDiplomeId(id);
        setCurrentPage("editDiplome");
    }

    function handleSelectCertification(id) {
        setSelectedCertificationId(id);
        setCurrentPage("certificationDetail");
    }

    function handleEditCertification(id) {
        setSelectedCertificationId(id);
        setCurrentPage("editCertification");
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
        {currentPage === "createCompetence" && <CreationCompetence />}
        {currentPage === "competences" && (
          <PageCompetence
            onSelectCompetence={handleSelectCompetence}
            onEditCompetence={handleEditCompetence}
          />
        )}
        {currentPage === "competenceDetail" && (
          <CompetenceDetail
            competenceId={selectedCompetenceId}
            onBack={() => setCurrentPage("competences")}
            onEdit={handleEditCompetence}
          />
        )}
        {currentPage === "editCompetence" && (
          <EditCompetence
            competenceId={selectedCompetenceId}
            onBack={() => setCurrentPage("competenceDetail")}
            onSaved={() => setCurrentPage("competenceDetail")}
          />
        )}
        {currentPage === "createDiplome" && <CreationDiplome />}
        {currentPage === "diplomes" && (
          <PageDiplome
            onSelectDiplome={handleSelectDiplome}
            onEditDiplome={handleEditDiplome}
          />
        )}
        {currentPage === "diplomeDetail" && (
          <DiplomeDetail
            diplomeId={selectedDiplomeId}
            onBack={() => setCurrentPage("diplomes")}
            onEdit={handleEditDiplome}
          />
        )}
        {currentPage === "editDiplome" && (
          <EditDiplome
            diplomeId={selectedDiplomeId}
            onBack={() => setCurrentPage("diplomeDetail")}
            onSaved={() => setCurrentPage("diplomeDetail")}
          />
        )}
        {currentPage === "createCertification" && <CreationCertification />}
        {currentPage === "certifications" && (
          <PageCertification
            onSelectCertification={handleSelectCertification}
            onEditCertification={handleEditCertification}
          />
        )}
        {currentPage === "certificationDetail" && (
          <CertificationDetail
            certificationId={selectedCertificationId}
            onBack={() => setCurrentPage("certifications")}
            onEdit={handleEditCertification}
          />
        )}
        {currentPage === "editCertification" && (
          <EditCertification
            certificationId={selectedCertificationId}
            onBack={() => setCurrentPage("certificationDetail")}
            onSaved={() => setCurrentPage("certificationDetail")}
          />
        )}
      </main>
    </div>
  );
}
