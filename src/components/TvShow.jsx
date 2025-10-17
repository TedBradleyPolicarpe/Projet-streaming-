
import { Link } from 'react-router-dom';

export default function TvShow({ show }) {
  return (
    <div className="card tvshow-card">
      <Link to={`/details/${show.tvshowId}`}>
        <div className="card-image">
          <figure className="image is-3by4">
            <img
              src={show.imgUrl}
              alt={`Affiche de ${show.title}`}
              className="tvshow-image"
            />
          </figure>
        </div>
        <div className="card-content has-text-centered">
        <p className="title is-6" style={{ marginBottom: '0.3rem' }}>{show.title}</p>
        <p className="subtitle is-7  " style={{marginTop: '0.2rem'}}>
            <strong>Studio:</strong> {show.studio.name}
          </p>
          <p className="subtitle is-7">
            <strong>Genres:</strong> {show.genres.map(g => g.name).join(', ')}
          </p>
        </div>
      </Link>
    </div>
  );
}
