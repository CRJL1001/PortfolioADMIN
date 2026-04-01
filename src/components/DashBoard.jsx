import Sidebar from "../components/Sidebar";
import CreationArticle from "./CreationArticle";
import "../style/dashboard.css";
import { useState } from "react";
import PageArticle from "./PageArticle";

export default function DashBoard() {
    const [currentPage, setCurrentPage] = useState("create");

    function handlePageChange(page) {
        setCurrentPage((old) => page);
    }

  return (
    <div className="dashboard">
      <Sidebar onPageChange={handlePageChange} activePage={currentPage} />
      <main className="dashboard-content">
        {currentPage === "create" && <CreationArticle />}   
        {currentPage === "articles" && <PageArticle />}     
      </main>
    </div>
  );
}
