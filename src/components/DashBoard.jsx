import Sidebar from "../components/Sidebar";
import CreationArticle from "./CreationArticle";
import "../style/dashboard.css";

export default function App() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-content">
        <CreationArticle />
      </main>
    </div>
  );
}
