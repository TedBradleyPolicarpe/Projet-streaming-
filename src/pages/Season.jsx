import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from '../constants';
import Episode from '../components/Episode';
import Pagination from '../components/Pagination';
import AuthContext from '../AuthContext';

export default function Season() {
  const { seasonId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [title, setTitle] = useState('');
  const [seasonNumber, setSeasonNumber] = useState(null);
  const [page, setPage] = useState(1);
  const { history } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${svrURL}/episodes?seasonId=${seasonId}`)
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.episodes);
        setTitle(data.tvshowTitle);
        setSeasonNumber(data.seasonNumber);
      });
  }, [seasonId]);

  const episodesPerPage = 8;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);
  const paginated = episodes.slice((page - 1) * episodesPerPage, page * episodesPerPage);

  return (
    <div className="container">
      <div className="has-text-centered mb-5">
      <h1 className="title">{title}</h1>
      <div>
        <h1 className="title">S{String(seasonNumber).padStart(2, '0')}</h1>
      </div>
      
      </div>
      
      <div className="columns is-multiline">
        {paginated.map(ep => {
          const viewed = history.some(h => h.episodeId === ep.episodeId);
          return (
            <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" key={ep.episodeId}>
              <Episode episode={ep} viewed={viewed} />
            </div>
          );
        })}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
