// Fetches the string portion of the url that is basically the movie id and creates a new URLSearchParams object
const urlParams = new URLSearchParams(window.location.search);

// Select the movieId from the urlParams
const movieId = urlParams.get('id');

const movieDetailsContainer = document.getElementById('movie-details');


async function fetchMovieDetails() {
  // Get movies from the api based on the movie id
  const response = await fetch(`https://omdbapi.com/?i=${movieId}&apikey=94397865`);
  const data = await response.json();

  const movieTitle = document.createElement('h1');
  movieTitle.textContent = data.Title;
  movieDetailsContainer.appendChild(movieTitle);

  const moviePoster = document.createElement('img');
  moviePoster.src = data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg';
  moviePoster.alt = data.Title;
  movieDetailsContainer.appendChild(moviePoster);

  const moviePlot = document.createElement('p');
  moviePlot.textContent = data.Plot;


  const movieDetails = document.createElement('div');
    movieDetails.innerHTML = `<div class="sections class="row">
                            <div class="section-title col-3">Plot: </div>
                            <div class="col-9">${data.Plot}</div>
                          </div>
                          <div class="sections class="row"">
                            <div class="section-title col-3">Rating: </div>
                            <div class="col-9">${data.imdbRating}</div>
                          </div>
                          <div class="sections class="row"">
                            <div class="section-title col-3">Year: </div>
                            <div class="col-9">${data.Year}</div>
                          </div>
                          <div class="sections class="row"">
                            <div class="section-title col-3">Cast: </div>
                            <div class="col-9">${data.Actors}</div>
                          </div>`;
    movieDetailsContainer.appendChild(movieDetails);
}

fetchMovieDetails();

// Home button
const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html'; 
});
