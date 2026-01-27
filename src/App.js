import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SiteList from "./sitelist";
import "./App.css";
import "./siteTheme.css";
import SiteDetails from "./siteData";
import VisitTimer from "./VisitTimer";

function App() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    async function loadSites() {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/BoyleSites.json`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setSites(data);
        } else {
          setSites([]);
        }
      } catch {
        setSites([]);
      }
    }

    loadSites();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-banner">
          <div className="app-title">
            <h1>Boyle Sites</h1>
            <p>Historic landmarks and landscapes around the county.</p>
          </div>
          <nav className="app-nav">
            <Link to="/site">Sites</Link>
          </nav>
          <VisitTimer />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/site" element={<SiteList sites={sites} />} />
            <Route path="/site/:SiteID" element={<SiteDetails sites={sites} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
