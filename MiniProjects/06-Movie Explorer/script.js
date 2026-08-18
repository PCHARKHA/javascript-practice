const API_KEY = "8ce61171";

async function searchMovies() {
    const movieName = document.getElementById("movieSearch").value.trim();

    if (!movieName) {
        showStatus("Please enter a movie name");
        return;
    }
    try {
        showStatus("Searching...");
        const data = await fetchMovies(movieName);

        if (data.Response === "False") {
            showStatus(data.Error);
            return;
        }

        displayMovies(data.Search);
        showStatus("");

    } catch (error) {
        showStatus("Something went wrong. Please try again.");
    }
}

async function fetchMovies(movieName){
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`;
    try{
        const response = await fetch(url); // fetch makes an HTTP request
        // Wait for this Promise to settle before moving to the next line 

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        return data;
    }catch(error){
        showStatus(`Error fetching movies: ${error.message}`);
        throw error;
    }    
}

function displayMovies(movies){
    const movieResults = document.getElementById("movieResults");

    movieResults.innerHTML = "";

    movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieResults.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
        <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title} poster">
        <div class="movie-info">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-meta">${movie.Year} | ${movie.Type}</p>
            <button class="details-button" data-movie-id="${movie.imdbID}">View Details</button>
        </div>
        `;
    return movieCard;
}

async function getMovieDetails(movieId) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`;
    
    try {
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error("Failed to fetch movie details");
        }
    
        const data = await response.json();
    
        if (data.Response === "False") {
                throw new Error(data.Error);
        }
    
        return data;
    
        } catch (error) {
            showStatus(`"Error fetching movie details: " ${error.message}`);
            throw error;
    }
}


function displayMovieDetails(movie){
    const movieDetails = document.getElementById("movieDetails");

    const poster = document.querySelector(".details-poster");
    const title = document.querySelector(".details-title");
    const year = document.querySelector(".details-year");
    const genre = document.querySelector(".details-genre");
    const rating = document.querySelector(".details-rating");
    const plot = document.querySelector(".details-plot");

    poster.src = movie.Poster;
    poster.alt = `${movie.Title} poster`;

    title.textContent = movie.Title;
    year.textContent = `Year: ${movie.Year}`;
    genre.textContent = `Genre: ${movie.Genre}`;
    rating.textContent = `IMDb Rating: ${movie.imdbRating}`;
    plot.textContent = `Plot: ${movie.Plot}`;

    movieDetails.classList.remove("hidden");
}

function showStatus(message){
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
}

async function loadFeaturedMovies() {
    try {
        showStatus("Loading featured movies...");
        const data = await fetchMovies("Avengers");

        if (data.Response === "False") {
            showStatus(data.Error);
            return;
        }

        displayMovies(data.Search);
        showStatus("");

    } catch (error) {
        showStatus("Unable to load featured movies.");
    }
}


function closeDetails() {
    const movieDetails = document.getElementById("movieDetails");
    movieDetails.classList.add("hidden");
}

//Event Listeners
// Search button
document.getElementById("searchButton").addEventListener("click", searchMovies);


// View Details buttons
document.getElementById("movieResults").addEventListener("click", async (event) => {
        if (!event.target.classList.contains("details-button")) {
            return;
        }

        const movieId = event.target.dataset.movieId;
        try {
            showStatus("Loading movie details...");
            const movie = await getMovieDetails(movieId);

            displayMovieDetails(movie);
            showStatus("");

        } catch (error) {
            showStatus("Unable to load movie details.");
        }
    });


// Close Details
document.getElementById("closeDetails").addEventListener("click", closeDetails);
// Load featured movies when page loads
loadFeaturedMovies();


