import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SiteList from "./sitelist.js";

import './App.css';
import SiteDetails from './siteData.js';

function App() {
  
  const [Sites, setSites] = useState([{}]);
  useEffect(() => {      
      async function fetchSites() 
      {
         const url = "/BoyleSites.json";
         const response = await fetch(url);
         if (response.ok) {
            const result = await response.json();
            console.log(result);
            setSites(result);
            }
        }
      fetchSites();
   },[]);

  useEffect(() => {
    async function loadData() 
    {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/BoyleSites.json`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected a JSON array of records.');
        }
        console.log('BoyleSites.json contents:', data);
      } catch (error) {
        console.error('Failed to load BoyleSites.json:', error);
      }
    }
      
    loadData();
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boyle Sites</h1>

        {

          <BrowserRouter>
            <nav>
              <Link to="/site">Sites</Link> |{" "}
            </nav>
            <Routes>
              <Route path="/site" element={<SiteList Sites={Sites} />} />
              <Route path="/site/:SiteID" element={<SiteDetails Sites={Sites} />} />
            </Routes>
          </BrowserRouter>
          
        }

      </header>
    </div>
  );
}

export default App;
