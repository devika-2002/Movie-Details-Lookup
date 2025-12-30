
const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");

const titleEl = document.getElementById("title");
const yearEl = document.getElementById("year");
const typeEl = document.getElementById("type");
const ratingEl = document.getElementById("rating");
const posterEl = document.getElementById("poster");
const plotEl = document.getElementById("plot");
const errorEl = document.getElementById("error");

function clearDetails() {
    titleEl.textContent = "";
    yearEl.textContent = "";
    typeEl.textContent = "";
    ratingEl.textContent = "";
    posterEl.innerHTML = "";
    plotEl.textContent = "";
}

searchBtn.addEventListener("click", function(){
    const movieName = movieInput.value;

    clearDetails();
    errorEl.textContent = "";

    if (movieName === "") {
        errorEl.textContent = "Please enter a movie or series name.";
        return;
    }

    const apiKey = "a69f4db";
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            if (data.Response === "False") {
                errorEl.textContent = "Movie or series not found.";
                return;
            }

            titleEl.textContent = `Title: ${data.Title}`;
            yearEl.textContent = `Year: ${data.Year}`;
            typeEl.textContent = `Type: ${data.Type}`;
            ratingEl.textContent = `IMDb Rating: ${data.imdbRating}`;
            plotEl.textContent = `Plot: ${data.Plot}`;

            if (data.Poster !== "N/A") {
                const img = document.createElement("img");
                img.src = data.Poster;
                posterEl.appendChild(img);
            } else {
                posterEl.textContent = "No poster available";
            }
        })
        .catch(function(error){
            clearDetails();
            errorEl.textContent = "Something went wrong. Please try again.";
            console.error(error);
        });
});

