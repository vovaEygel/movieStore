document.addEventListener("DOMContentLoaded", init);

function init() {
    getresults();
}
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=2c46288716a18fb7aadcc2a801f3fc6b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&';

function getresults() {
    fetch(url, {
            headers: new Headers({
                'Accept': 'application/json'
            })
        })
        .then(res => { return res.text() })
        .then(res => {
            let data = JSON.parse(res);
            var htmlStr = '';

            for (let itr = 0; itr < data.results.length; itr++) {
                htmlStr += `
                <a href="https://www.themoviedb.org/movie/${data.results[itr]?.id}">
                <div class="movieCard">
                <h2>${data.results[itr]?.original_title}</h2>
                <p>${data.results[itr]?.overview}</p>
                <img src="https://image.tmdb.org/t/p/original${data.results[itr]?.poster_path}" alt="">
            </div></a>`
            }
            console.log(htmlStr)
            document.querySelector("#movieList").innerHTML =
                htmlStr
        }).catch(error => {
            throw (error);
        })
}