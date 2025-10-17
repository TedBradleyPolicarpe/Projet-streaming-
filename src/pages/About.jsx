export default function About() {
  return (
    <div role="main">
      <h1 className="title">À propos du projet</h1>
      <p>
        Ce projet a été réalisé dans le cadre du cours de développement Web, et consiste à construire une plateforme de streaming de type Netflix ou Crunchyroll.
      </p>

      <h2 className="subtitle mt-5">Suggestions d'amélioration</h2>
      <ul>
        <li>✔️ Ajouter un système de favoris ou de notation pour les épisodes</li>
        <li>✔️ Ajouter une barre de recherche globale</li>
        <li>✔️ Intégrer un mode sombre pour l’accessibilité visuelle</li>
        <li>✔️ Support multilingue (français / anglais)</li>
        <li>✔️ Notifications email ou push pour nouveaux épisodes</li>
      </ul>

      <h2 className="subtitle mt-5">Suggestions pour le cours</h2>
      <ul>
        <li>📚 Dans la partie react  que les exercises devient différent que celle de Javascript pour rester les exerices captivant  </li>
        <li>💡 Plus de démonstrations de débogage en direct</li>
        <li>📂 Inclure des exemples concrets de déploiement Azure dans les notes de cours</li>
      </ul>
    </div>
  );
}
