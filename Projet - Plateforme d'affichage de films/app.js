let movies = [];

async function loadMovies() {
  const response = await fetch("movies.json");
  movies = await response.json();

  displayMovies(movies);
  displayStats(movies);
}

function displayMovies(moviesToDisplay) {
  const container = document.querySelector("#movies");

  container.innerHTML = moviesToDisplay
    .map(movie => `
      <article class="movie-card">
        <!-- Affichage de l'affiche du film -->
        <div class="movie-poster">
          <img src="${movie.poster}" alt="Affiche de ${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=Affiche+Indisponible';">
        </div>

        <div class="movie-rating">
          ⭐ ${movie.rating}
        </div>

        <h3>${movie.title}</h3>

        <p class="movie-info">
          ${movie.year} · ${movie.genre}
        </p>

        <p class="movie-director">
          ${movie.director}
        </p>

        <p class="movie-description">
          ${movie.description}
        </p>
      </article>
    `)
    .join("");

  document.querySelector("#movie-result").textContent =
    `${moviesToDisplay.length} film${moviesToDisplay.length > 1 ? "s" : ""}`;
}

function displayStats(moviesToDisplay) {
  const count = moviesToDisplay.length;

  const totalRating = moviesToDisplay.reduce(
    (sum, movie) => sum + movie.rating,
    0
  );

  const averageRating = totalRating / count;

}

loadMovies();

// Écouter ce qui est tapé dans la barre de recherche
const searchInput = document.querySelector("#search-input");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    // Filtrer le tableau des films selon le titre
    const filteredMovies = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm)
    );

    // Réafficher uniquement les films correspondants
    displayMovies(filteredMovies);
  });
}