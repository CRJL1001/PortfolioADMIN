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
      </nav>
    </aside>
  );
}
