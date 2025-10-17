export default function Artist({ artist }) {
  return (
    <div className="card has-text-centered mx-2" style={{ width: '160px', flex: '0 0 auto' }}>
      <div className="card-image">
        <figure className="image is-square">
          <img
            src={artist.imgUrl}
            alt={`Photo de ${artist.name}`}
            style={{ objectFit: 'cover' }}
          />
        </figure>
      </div>
      <div className="card-content p-2">
        <p className="has-text-weight-bold is-size-6">{artist.name}</p>
        <p className="is-size-7">Rôle : {artist.character}</p>
      </div>
    </div>
  );
}
