import { Link } from 'react-router-dom';

export default function Episode({ episode, viewed }) {
  const episodeCode =
    episode.number && typeof episode.number === 'string' && episode.number.includes('S')
      ? episode.number
      : `S${String(episode.seasonNumber).padStart(2, '0')}E${String(episode.episodeNumber).padStart(2, '0')}`;

  return (
    <div className={`card ${viewed ? 'has-background-grey-lighter' : ''}`} style={{ height: '100%' }}>
      <Link
        to={`/play/${episode.episodeId}`}
        aria-label={`Voir ${episode.title}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="card-image" style={{ height: '200px', overflow: 'hidden' }}>
          <figure className="image is-4by3">
            <img
              src={episode.imgUrl}
              alt={`Image de ${episode.title}`}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </figure>
        </div>

        <div className="card-content has-text-centered px-2 py-3">
          <p
            className="has-text-weight-semibold"
            style={{
              fontSize: '0.9rem',
              lineHeight: '1.2',
              wordBreak: 'break-word',
              hyphens: 'auto',
              padding: '0.5rem 0',
              minHeight: '3.6em',
              marginBottom: '0.25rem',
            }}
          >
            {episode.title}
          </p>
          <p className="subtitle is-7 has-text-grey">{episodeCode}</p>
        </div>
      </Link>
    </div>
  );
}
