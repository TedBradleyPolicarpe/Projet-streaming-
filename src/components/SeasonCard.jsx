// src/components/SeasonCard.jsx
import { Link } from 'react-router-dom';

export default function SeasonCard({ season }) {
  return (
    <div className="card" style={{ height: '100%' }}>
      <Link
        to={`/season/${season.seasonId}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
        aria-label={`Voir la saison ${season.seasonNumber}`}
      >
        <div className="card-image">
          <figure className="image is-3by4">
            <img
              src={season.imgUrl}
              alt={`Affiche de la saison ${season.seasonNumber}`}
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </figure>
        </div>

        <div className="card-content has-text-centered" style={{ lineHeight: '1.3', paddingTop: '0.5rem' }}>
          <div style={{ display: 'block' }}>
          <p className="title is-6" style={{ marginBottom: '0.3rem' }}>
  Saison {season.seasonNumber ?? '?'}
</p>
            <p className="subtitle is-7 has-text-grey" style={{ marginTop: '0' }}>
              {season.episodeCount} épisodes
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
