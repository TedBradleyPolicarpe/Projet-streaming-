import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { svrURL } from '../constants';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function sha1(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  const validate = async () => {
    const newErrors = [];

    if (!email.includes('@') || email.length < 5 || email.length > 50) {
      newErrors.push("Le courriel doit contenir '@' et avoir entre 5 et 50 caractères.");
    }

    const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;
    if (!usernameRegex.test(username)) {
      newErrors.push("Le nom d'utilisateur doit commencer par une lettre, contenir entre 5 et 30 caractères, et inclure seulement lettres, chiffres ou _.");
    }

    const passwordRegex = /[!@#$%&*]/;
    if (password.length < 8 || password.length > 30 || !passwordRegex.test(password)) {
      newErrors.push("Le mot de passe doit contenir entre 8 et 30 caractères et inclure au moins un caractère spécial (!@#$%&*).");
    }

    if (password !== confirmPassword) {
      newErrors.push("Les mots de passe ne correspondent pas.");
    }

    try {
      const hash = await sha1(password);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();
      if (text.toUpperCase().includes(suffix)) {
        newErrors.push("Ce mot de passe a été compromis. Veuillez en choisir un autre.");
      }
    } catch {
      newErrors.push("Erreur lors de la vérification du mot de passe.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validate()) {
      try {
        const res = await fetch(`${svrURL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password })
        });
        if (res.status === 201) {
          navigate('/login', { state: { newUser: username } });
        } else {
          const data = await res.json();
          setErrors([data.message || "Erreur lors de l'inscription."]);
        }
      } catch {
        setErrors(["Erreur de connexion au serveur."]);
      }
    }
  };

  return (
    <div className="container mt-6">
      <div className="columns is-centered">
        <div className="column is-12">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 className="title has-text-centered">Inscription</h1>

            {errors.length > 0 && (
              <div className="notification is-danger is-light" role="alert" tabIndex="0">
                <button className="delete" onClick={() => setErrors([])} aria-label="Fermer"></button>
                <ul className="mt-2">
                  {errors.map((err, idx) => (
                    <li key={idx}><strong>•</strong> {err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email" className="label">Courriel</label>
                <div className="control has-icons-left">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="icon is-left"><i className="fas fa-envelope"></i></span>
                </div>
              </div>

              <div className="field">
                <label htmlFor="username" className="label">Nom d'utilisateur</label>
                <div className="control has-icons-left">
                  <input
                    id="username"
                    className="input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span className="icon is-left"><i className="fas fa-user"></i></span>
                </div>
              </div>

              <div className="field">
                <label htmlFor="password" className="label">Mot de passe</label>
                <div className="control has-icons-left">
                  <input
                    id="password"
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="icon is-left"><i className="fas fa-lock"></i></span>
                </div>
              </div>

              <div className="field">
                <label htmlFor="confirmPassword" className="label">Confirmer le mot de passe</label>
                <div className="control has-icons-left">
                  <input
                    id="confirmPassword"
                    className="input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span className="icon is-left"><i className="fas fa-lock"></i></span>
                </div>
              </div>

              <div className="field is-grouped mt-5 is-justify-content-center">
                <div className="control">
                  <button type="submit" className="button is-success">S'inscrire</button>
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
