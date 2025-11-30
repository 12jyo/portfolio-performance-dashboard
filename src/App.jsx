import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;