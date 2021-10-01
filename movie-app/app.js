const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2f864c031c13236da506a92055342d0&page=1'

const IMG_Path = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=c2f864c031c13236da506a92055342d0&query="'

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
// Get movies
getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
};
function showMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
        <div class="movie-container">
        <img
          src="${IMG_Path + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByVote(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>`
      main.appendChild(movieElement)
        
    });
}

function getClassByVote (vote){
    if(vote >= 8){
        return 'green'
    }
    else if(vote >= 5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchItem = search.value
    if(searchItem && searchItem !== ''){
        getMovies(SEARCH_URL + searchItem);

        search.value = '';
    } else{
        window.location.reload();
    }
})