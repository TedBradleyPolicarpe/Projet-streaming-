
import { useEffect, useState } from 'react';
import { svrURL } from '../constants';
import TvShow from '../components/TvShow';
import Pagination from '../components/Pagination';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [studios, setStudios] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [title, setTitle] = useState('');
  const [studio, setStudio] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(() => parseInt(localStorage.getItem('itemsPerPage')) || 8);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${svrURL}/tvshows`).then(res => res.json()).then(data => setShows(data));
    fetch(`${svrURL}/studios`).then(res => res.json()).then(data => setStudios(data));
  }, []);

  useEffect(() => {
    let result = shows;
    if (title) result = result.filter(s => s.title.toLowerCase().includes(title.toLowerCase()));
    if (studio) result = result.filter(s => s.studio.name === studio);
    setFiltered(result);
    setPage(1);
  }, [shows, title, studio]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleItemsChange = e => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    localStorage.setItem('itemsPerPage', value);
    setPage(1);
  };

  return (
    <div className="container">
      <div className="columns is-multiline is-vcentered mb-4">
        <div className="column is-one-third">
          <label className="label" htmlFor="title">Title:</label>
          <input id="title" className="input" type="text" placeholder="Name" value={title} onChange={e => setTitle(e.target.value)} aria-label="Title filter" />
        </div>
        <div className="column is-one-third">
          <label className="label" htmlFor="studio">Studio:</label>
          <div className="select is-fullwidth">
            <select id="studio" value={studio} onChange={e => setStudio(e.target.value)} aria-label="Studio filter">
              <option value="">All studios</option>
              {studios.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
        </div>
        <div className="column is-one-third">
          <label className="label" htmlFor="itemsPerPage">Téléséries par page</label>
          <div className="select is-fullwidth">
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsChange} aria-label="Items per page">
              {[4, 8, 12, 16].map(n => <option key={n} value={n}>{n}/page</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="columns is-multiline">
        {paginated.map(show => (
          <div key={show.tvshowId} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
            <TvShow show={show} />
          </div>
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
