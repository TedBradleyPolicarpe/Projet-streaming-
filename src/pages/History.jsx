import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { svrURL } from '../constants';
import Pagination from '../components/Pagination';

export default function History() {
  const { token, history, setHistory } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const episodesPerPage = 6;

  useEffect(() => {
    if (token && history.length === 0) {
      fetch(`${svrURL}/user/history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setHistory(data); 
          localStorage.setItem('history', JSON.stringify(data));
        })
        .catch(err => console.error("Erreur chargement historique", err));
    }
  }, [token, setHistory, history.length]);


  useEffect(() => {
    const saved = localStorage.getItem('history');
    if (saved && history.length === 0) {
      setHistory(JSON.parse(saved));
    }
  }, [history.length, setHistory]);

  const totalPages = Math.ceil(history.length / episodesPerPage);
  const paginated = history.slice((page - 1) * episodesPerPage, page * episodesPerPage);

  const fixImgURL = (url) => {
    if (!url) return 'https://via.placeholder.com/640x360?text=Image+indisponible';
    return url.replace('http://localhost:3000', 'https://tvshowdbapi.herokuapp.com');
  };

  return (
    <div className="container" role="main">
      <h1 className="title">Historique de visionnement</h1>

      {history.length === 0 ? (
        <p className="has-text-grey">Aucun épisode visionné.</p>
      ) : (
        <>
          <div className="columns is-multiline">
            {paginated.map(ep => (
              <div
                className="column is-half-mobile is-one-third-tablet is-one-third-desktop"
                key={ep.episodeId}
              >
                <div className="card">
                  <div className="card-image">
                    <Link to={`/play/${ep.episodeId}`}>
                      <figure className="image is-4by3">
                        <img
                          src={fixImgURL(ep.imgUrl)}
                          alt={`Image de l’épisode ${ep.episodeTitle || 'Inconnu'}`}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/640x360?text=Image+indisponible';
                            e.target.alt = 'Image indisponible';
                          }}
                        />
                      </figure>
                    </Link>
                  </div>
                  <div className="card-content has-text-centered">
                    <p className="mb-1">
                      <Link to={`/details/${ep.tvshowId}`} className="has-text-weight-bold">
                        {ep.tvshowTitle || 'Série inconnue'}
                      </Link>
                    </p>
                    <p>
                      <Link to={`/season/${ep.seasonId}`}>
                        Saison {ep.seasonNumber || '?'}
                      </Link>
                      &nbsp;|&nbsp;
                      <Link to={`/play/${ep.episodeId}`}>
                        {ep.episodeTitle || 'Titre inconnu'}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
