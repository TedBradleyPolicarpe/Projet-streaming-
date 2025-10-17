import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { svrURL } from '../constants';

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (location.state?.newUser) {
      setUsername(location.state.newUser);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!username.trim()) errors.push("Le nom d'utilisateur est obligatoire.");
    if (!password.trim()) errors.push("Le mot de passe est obligatoire.");

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const res = await fetch(`${svrURL}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        navigate('/');
      } else {
        const data = await res.json();
        setErrorMessages([data.message || "Vous n'êtes pas autorisé."]);
      }
    } catch {
      setErrorMessages(["Erreur de connexion au serveur."]);
    }
  };

  return (
    <div className="container mt-6">
      <div className="columns is-centered">
        <div className="column is-12">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 className="title has-text-centered">Login</h1>

            {errorMessages.length > 0 && (
              <div className="notification is-danger is-light">
                <button className="delete" onClick={() => setErrorMessages([])}></button>
                {errorMessages.map((msg, i) => (
                  <p key={i}>{msg}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="username" className="label">Username</label>
                <div className="control has-icons-left">
                  <input
                    id="username"
                    className={`input ${errorMessages.some(msg => msg.toLowerCase().includes("utilisateur")) ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="e1234567"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field mt-4">
                <label htmlFor="password" className="label">Mot de passe</label>
                <div className="control has-icons-left">
                  <input
                    id="password"
                    className={`input ${errorMessages.some(msg => msg.toLowerCase().includes("mot de passe")) ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <div className="field is-grouped mt-5 is-justify-content-center">
                <div className="control">
                  <button type="submit" className="button is-success">Connexion</button>
                </div>
                <div className="control">
                  <Link to="/" className="button is-danger">Annuler</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
