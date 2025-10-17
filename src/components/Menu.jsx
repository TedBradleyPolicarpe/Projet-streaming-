import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

export default function Menu() {
  const { token, setToken, setHistory } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setHistory([]);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <nav className="navbar has-background-link-dark px-4" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-text-white has-text-weight-bold">TP2</Link>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-end">
          

          {!token ? (
            <>
              <Link to="/signup" className="navbar-item has-text-white">Inscription</Link>
              <Link to="/login" className="navbar-item has-text-white">Connexion</Link>
              <Link to="/about" className="navbar-item has-text-white">À propos</Link>
            </>
          ) : (
            <>
              <Link to="/history" className="navbar-item has-text-white">Historique</Link>
              <button onClick={handleLogout} className="navbar-item has-text-white">Déconnexion</button>
              <Link to="/about" className="navbar-item has-text-white">À propos</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
