import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from '../constants';
import Artist from '../components/Artist';
import SeasonCard from '../components/SeasonCard';

export default function Details() {
  const { tvshowId } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`${svrURL}/tvshow?tvshowId=${tvshowId}`)
      .then(res => res.json())
      .then(data => {
        
        const enrichedSeasons = data.seasons.map((season, index) => ({
          ...season,
          seasonNumber: season.seasonNumber ?? index + 1
        }));
        setShow({ ...data, seasons: enrichedSeasons });
      });
  }, [tvshowId]);
  
  if (!show) return <p className="has-text-centered mt-5">Chargement...</p>;

  return (
    <div className="container">
      <div className="columns is-vcentered mb-5">
        <div className="column is-one-third">
          <figure className="image is-3by4">
            <img src={show.imgUrl} alt={`Affiche de ${show.title}`} />
          </figure>
        </div>

        <div className="column">
          <h1 className="title is-3 mb-3">{show.title}</h1>

          <div className="content">
            <p><strong>Année:</strong> {show.year}</p>
            <p><strong>Épisodes:</strong> {show.episodeCount}</p>
            <p><strong>Studio:</strong> {show.studio.name}</p>
            <p><strong>Genres:</strong> {show.genres.map(g => g.name).join(', ')}</p>
            <p className="mt-4">{show.plot}</p>
          </div>

          {show.audioURL && (
            <div className="mt-4">
              <audio controls style={{ width: '100%', maxWidth: '400px' }}>
                <source src={show.audioURL} type="audio/mpeg" />
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            </div>
          )}
        </div>
      </div>

      <h2 className="subtitle mt-5">Acteurs</h2>
      <div className="box" style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
        <div className="is-flex px-2" style={{ gap: '1rem', minWidth: 'fit-content' }}>
          {show.roles.map(role => (
            <div key={role.roleId} style={{ flex: '0 0 auto', width: '160px' }}>
              <Artist artist={role} />
            </div>
          ))}
        </div>
      </div>

      <h2 className="subtitle mt-5">Saisons</h2>
      <div className="box" style={{ overflowX: 'scroll', paddingBottom: '1rem' }}>
        <div className="is-flex px-2" style={{ gap: '1rem', minWidth: 'fit-content' }}>
          {show.seasons.map(season => (
            <div key={season.seasonId} style={{ flex: '0 0 auto', width: '200px' }}>
              <SeasonCard season={season} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
