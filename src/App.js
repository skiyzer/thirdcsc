import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    async function loadData() {
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
      </header>
    </div>
  );
}

export default App;
