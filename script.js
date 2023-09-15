// &apikey=94397865

const searchInput = document.getElementById('search-input');
const searchList = document.getElementById('searchList');
const favoriteMoviesList = document.getElementById('favoriteMoviesList');
let timeoutId;

// Load favorite movies from local storage
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];


// fetch all the movies data based on the search bar data
async function searchMovies() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length > 0) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=94397865`);
      const data = await response.json();

      if (data.Response === 'True') {
        displaySearchResults(data.Search);
      } else {
        displaySearchResults([]);
      }
    }, 500);
  } else {
    displaySearchResults([]);
  }
}

// Based on the data passed from searchMovies() display items in a list
function displaySearchResults(results) {
  searchList.innerHTML = '';

  results.forEach((movie) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center','search-list-items','custom-class-li');

    const posterImage = document.createElement('img');
    posterImage.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
    posterImage.alt = movie.Title;
    posterImage.classList.add('rounded', 'mr-3', 'list_images','thumbnail-image');
    listItem.appendChild(posterImage);

    const titleElement = document.createElement('span');
    titleElement.classList.add('movie-details-in-list','custom-class-title')
    titleElement.textContent = movie.Title;
    listItem.appendChild(titleElement);

    const favoriteButton = document.createElement('button');
    favoriteButton.innerHTML = '<i class="fas fa-heart heart-button"></i>';
    favoriteButton.classList.add('btn', 'btn-primary','add-to-favorites-button','custom-class-button');
    listItem.appendChild(favoriteButton);

    // Adding eventlistner to the search results
    listItem.addEventListener('click',(e) => {
      if(e.target === favoriteButton || e.target.classList.contains('heart-button')){
        // If it is the favourite button then add it to tha favourite list
        addToFavorites(movie);
        
      }else{
        // If the click is on the list item other than the fav-button then pass the ID and redirect to the info-page
        window.location.href = `movie-info.html?id=${movie.imdbID}`;
      }
    })


    searchList.appendChild(listItem);
  });
}

// Adds movies to favouriteMovies json item in local Storage
function addToFavorites(movie) {
  favoriteMovies.push(movie);
  saveFavoritesToLocalStorage(); //Updates the localStorage
  renderFavorites();
}

// Remove movies from the favouriteMovies json
function removeFromFavorites(index) {
  favoriteMovies.splice(index, 1); //Removes one element starting from that specific index that has been passed, basically deletes the item
  saveFavoritesToLocalStorage(); //Updates the localStorage, so that the info doesn't loose when refreshed
  renderFavorites();
}

// Render the favourite movies
function renderFavorites() {
    favoriteMoviesList.innerHTML = '';
  
    const row = document.createElement('div');
    row.classList.add('row');
  
    favoriteMovies.forEach((movie, index) => {
      const col = document.createElement('div');
      col.classList.add('col-4', 'mb-4','card-container');
  
      const card = document.createElement('div');
        card.classList.add('card', 'custom-card');
  
      const posterImage = document.createElement('img');
      posterImage.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
      posterImage.alt = movie.Title;
      posterImage.classList.add('card-img-top','custom-card-image','custom-class-image');
      card.appendChild(posterImage);
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const titleElement = document.createElement('h5');
      titleElement.textContent = movie.Title;
      titleElement.classList.add('card-title','custom-class-title');
      cardBody.appendChild(titleElement);
  
      const yearElement = document.createElement('p');
      yearElement.textContent = `Year: ${movie.Year}`;
      yearElement.classList.add('card-text','custom-class-year');
      cardBody.appendChild(yearElement);
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('btn', 'btn-danger','custom-class-button');
      // Add Evenet Listner for the Remove Button
      removeButton.addEventListener('click', () => {
        removeFromFavorites(index);
      });
      cardBody.appendChild(removeButton);
  
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    });
  
    favoriteMoviesList.appendChild(row);
  }

// Updates the favoriteMovies JSON item that contains all the favourite movies
function saveFavoritesToLocalStorage() {
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

// this eventListner triggers the searchMovies() function when input is provided
searchInput.addEventListener('input', searchMovies);

// Render favorite movies on page load
renderFavorites();

// Add functionality for the favourite button
const favButton = document.getElementById('favourite-button');
favButton.addEventListener('click',()=>{
  window.location.href = `favourites.html?favorites=${encodeURIComponent(JSON.stringify(favoriteMovies))}`;
})
