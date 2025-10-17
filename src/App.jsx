import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './AuthContext';
import 'bulma/css/bulma.min.css';

import Menu from './components/Menu';
import Footer from './components/Footer';

import Home from './pages/Home';
import Details from './pages/Details';
import Season from './pages/Season';
import JouerEpisode from './pages/JouerEpisode';
import History from './pages/History';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';

export default function App() {
  const [token, setToken] = useState(null);
  const [history, setHistory] = useState([]);

  // Lire token et historique depuis localStorage au premier chargement
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedHistory = localStorage.getItem('history');
    if (storedToken) setToken(storedToken);
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  // Mettre à jour localStorage si le token change
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  // Mettre à jour localStorage si l’historique change
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const auth = { token, setToken, history, setHistory };

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Menu />
        <main className="section" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:tvshowId" element={<Details />} />
            <Route path="/season/:seasonId" element={<Season />} />
            <Route path="/play/:episodeId" element={<JouerEpisode />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<p>Page non trouvée</p>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
