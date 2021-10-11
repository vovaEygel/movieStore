document.addEventListener("DOMContentLoaded", init);

const selectElement = document.querySelector('.filter');
selectElement.addEventListener('change', (event) => {

    if (event.target.value === 'now_playing') {
        getresults(event.target.value);
        renderPage(mainHtmlStr);
    } else if (event.target.value === 'popular') {
        getresults(event.target.value);
        renderPage(mainHtmlStr);
    } else if (event.target.value === 'favorites') {
        showFavorites()
    }

});

var favorites = [];
var movies = [];
var mainHtmlStr = '';

function init() {
    getresults();
}

async function getresults(filter = 'popular') {
    // console.log(`filter`, filter)
    const url = `https://api.themoviedb.org/3/movie/${filter}?api_key=2c46288716a18fb7aadcc2a801f3fc6b&language=en-US&page=1`;
    await fetch(url, {
            headers: new Headers({
                'Accept': 'application/json'
            })
        })
        .then(res => { return res.text() })
        .then(res => {
            let data = JSON.parse(res);
            movies = data.results;
            for (let itr = 0; itr < data.results.length; itr++) {
                mainHtmlStr += `
                <div class="movieCard" onclick="selectMovie(${data.results[itr]?.id})">
                <h2>${data.results[itr]?.original_title}</h2>
                <img src="https://image.tmdb.org/t/p/original${data.results[itr]?.poster_path}" alt="">
            </div>`
            }
            renderPage(mainHtmlStr);
        }).catch(error => {
            throw (error);
        })
}

function selectMovie(id) {
    let movie = movies.find(item => item.id === id)
    if (movie) {
        let htmlStr = `
        <div class="moviePage">
        <div class="buttons flex space-between">
        <button onclick="homePage()">back</button>
        <button onclick="addToFavorites(${movie.id})">add to favorites</button>
        </div>
        <h2>${movie.original_title}</h2>
        <p>${movie.overview}</p>
        <div class="imageWrap">
        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
        </div>
        </div>`;
        renderPage(htmlStr)
        let filter = document.querySelector(".filter")
    }
}

function renderPage(str) {
    document.querySelector("#content").innerHTML = str;
}

function addToFavorites(movieId) {
    if (favorites.indexOf(movieId) !== -1) return;
    favorites.push(movies.find(item => item.id === movieId))
}

function showFavorites() {
    var htmlStr = ''
    htmlStr += `<button onclick="homePage()">back</button>`
    for (let itr = 0; itr < favorites.length; itr++) {
        htmlStr += `
        <div class="container">
        <div class="movieCard" onclick="selectMovie(${favorites[itr]?.id})">
        <button onclick="removeFavorite(${favorites[itr]?.id})">remove favorite</button>
        <h2>${favorites[itr]?.original_title}</h2>
        <img src="https://image.tmdb.org/t/p/original${favorites[itr]?.poster_path}" alt="">
        </div>
        </div>`
    }
    renderPage(htmlStr)
}

function removeFavorite(id) {
    favorites = favorites.filter(item => item.id !== id)
}

function homePage() {
    renderPage(mainHtmlStr)
}