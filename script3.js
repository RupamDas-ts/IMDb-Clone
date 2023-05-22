// Get the favorite movies list container element
const favoriteMoviesList = document.getElementById('moviesList');

// Retrieve the favorite movies from localStorage or initialize an empty array
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

// Function to render the favorite movies list
function renderFavoriteMovies() {
  // Clear the existing list
  favoriteMoviesList.innerHTML = '';

  // Render each favorite movie
  favoriteMovies.forEach((movie) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item','fav-list-items');

    const moviePoster = document.createElement('img');
    moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
    moviePoster.alt = movie.Title;
    moviePoster.classList.add('movie-poster');
    listItem.appendChild(moviePoster);

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.Title;
    listItem.appendChild(movieTitle);

    const movieYear = document.createElement('p');
    movieYear.textContent = `Year: ${movie.Year}`;
    listItem.appendChild(movieYear);

    const movieCast = document.createElement('p');
    movieCast.textContent = `Cast: ${movie.Actors}`;
    listItem.appendChild(movieCast);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove from Favorites';
    removeButton.classList.add('btn', 'btn-danger');
    removeButton.addEventListener('click', () => {
      removeFromFavorites(movie);
    });
    listItem.appendChild(removeButton);

    favoriteMoviesList.appendChild(listItem);
  });
}

// Function to remove a movie from favorites
function removeFromFavorites(movie) {
  // Remove from favoriteMovies array
  const index = favoriteMovies.findIndex((favMovie) => favMovie.Title === movie.Title);
  if (index !== -1) {
    favoriteMovies.splice(index, 1);
  }

  // Update favoriteMovies in localStorage
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

  // Re-render the favorite movies list
  renderFavoriteMovies();
}

// Initial rendering of the favorite movies list
renderFavoriteMovies();

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});