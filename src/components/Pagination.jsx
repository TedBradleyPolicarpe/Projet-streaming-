export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination is-centered mt-4" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <button
        className="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
      <ul className="pagination-list">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`pagination-link ${page === currentPage ? 'is-current' : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Aller à la page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
