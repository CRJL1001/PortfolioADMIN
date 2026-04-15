export default function Sidebar({ onPageChange, activePage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Portfolio Admin</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={activePage === "create" ? "active" : ""}
          onClick={() => onPageChange("create")}
        >
          ✏️ Créer un article
        </button>

        <button
          className={activePage === "articles" ? "active" : ""}
          onClick={() => onPageChange("articles")}
        >
          📄 Tous les articles
        </button>

        <button
          className={activePage === "createExperience" ? "active" : ""}
          onClick={() => onPageChange("createExperience")}
        >
          💼 Créer une expérience
        </button>

        <button
          className={activePage === "experiences" ? "active" : ""}
          onClick={() => onPageChange("experiences")}
        >
          📋 Toutes les expériences
        </button>

        <button
          className={activePage === "createCompetence" ? "active" : ""}
          onClick={() => onPageChange("createCompetence")}
        >
          🛠️ Créer une compétence
        </button>

        <button
          className={activePage === "competences" ? "active" : ""}
          onClick={() => onPageChange("competences")}
        >
          📚 Toutes les compétences
        </button>

        <button
          className={activePage === "createDiplome" ? "active" : ""}
          onClick={() => onPageChange("createDiplome")}
        >
          🎓 Créer un diplôme
        </button>

        <button
          className={activePage === "diplomes" ? "active" : ""}
          onClick={() => onPageChange("diplomes")}
        >
          🧾 Tous les diplômes
        </button>

        <button
          className={activePage === "createCertification" ? "active" : ""}
          onClick={() => onPageChange("createCertification")}
        >
          🏆 Créer une certification
        </button>

        <button
          className={activePage === "certifications" ? "active" : ""}
          onClick={() => onPageChange("certifications")}
        >
          📜 Toutes les certifications
        </button>
      </nav>
    </aside>
  );
}
