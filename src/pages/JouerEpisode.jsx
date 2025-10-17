import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { svrURL } from '../constants';

export default function JouerEpisode() {
  const { episodeId } = useParams();
  const { token, history, setHistory } = useContext(AuthContext);
  const [episode, setEpisode] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!token) {
      setUnauthorized(true);
      return;
    }

    fetch(`${svrURL}/viewepisode?episodeId=${episodeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) {
          setUnauthorized(true);
          return null;
        }
        return res.json();
      })
      .then(async data => {
        if (data) {
          setEpisode(data);

          const alreadyViewed = history.some(ep => ep.episodeId === data.episodeId);
          if (!alreadyViewed) {
            // Mise à jour de l'historique utilisateur depuis l'API
            try {
              const res = await fetch(`${svrURL}/user/history`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (res.ok) {
                const updatedHistory = await res.json();
                setHistory(updatedHistory);
              }
            } catch {
              console.error("Échec de mise à jour de l'historique");
            }
          }
        }
      })
      .catch(() => {
        setUnauthorized(true);
      });
  }, [token, episodeId, setHistory, history]);

  if (unauthorized && !token) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <div className="notification is-danger is-light" role="alert">
            <h1 className="title is-4 has-text-danger" tabIndex="0">
              ⚠ Connexion requise
            </h1>
            <p className="mb-4" tabIndex="0">
              Vous devez être connecté pour accéder à cette page.
            </p>
            <Link to="/login" className="button is-link is-medium">
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (unauthorized) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <div className="notification is-danger is-light" role="alert">
            <h1 className="title is-4 has-text-danger" tabIndex="0">
              ⚠ Accès refusé
            </h1>
            <p className="mb-4" tabIndex="0">
              Votre session a expiré ou le jeton est invalide.
            </p>
            <Link to="/login" className="button is-link is-medium">
              Se reconnecter
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!episode) {
    return (
      <div className="has-text-centered mt-6">
        <p>Chargement de l’épisode...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="title">{episode.title}</h1>
      <video
        src={episode.videoURL}
        controls
        className="mb-5"
        style={{ width: '100%', maxHeight: '60vh' }}
      >
        Votre navigateur ne supporte pas la vidéo.
      </video>
      <p><strong>Durée:</strong> {episode.duration} minutes</p>
    </div>
  );
}
