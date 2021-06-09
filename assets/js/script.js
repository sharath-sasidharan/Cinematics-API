//Selecting all required elements

var API_KEY = "api_key=fcbc8feaaeedb221ba988addb2493764",
  BASE_URL = "https://api.themoviedb.org/3",
  API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY,
  IMG_URL = "https://image.tmdb.org/t/p/w500",
  SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY,
  main = document.getElementById("movie"),
  movieDetails = document.querySelector(".movie-details-content"),
  movieCloseBtn = document.getElementById("movie-close-btn"),
  form = document.getElementById("form"),
  search = document.getElementById("search"),
  formYear = document.getElementById('form-year'),
  searchYear = document.getElementById('search-year'),
  logout = document.getElementById("logout"),
  SEARCH_YEAR = BASE_URL + '/discover/movie?'+API_KEY+'&primary_release_year=';

  // SEARCH BY YEAR SCRIPT STARTS HERE 
  formYear.addEventListener('submit',function(e) {
    e.preventDefault();
    var searchByYear = parseInt(searchYear.value);
    if(searchByYear){
        getMovies(SEARCH_YEAR+searchByYear)
    } else {
        getMovies(API_URL);
    }
});
  // SEARCH BY YEAR SCRIPT ENDS HERE 

// MOVIE LISTING SCRIPT STARTS HERE
//CALLING
getMovies(API_URL);
function getMovies(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var html = "";
      if (data.results) {
        data.results.forEach(function (movie) {
          html += `
              <div class="movie" data-id = "${movie.id}">
                  <figure class="movie-img">
                      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                  </figure>
                  <div class="movie_info">
                      <h3> ${movie.title} </h3>
                      <a href="#" title="Show Details" class="movie-btn btn btn1">Show details</a>
                  </div>
              </div>                     
        `;
        });
      } else {
        html = "Sorry, we didn't find any movies!";
        main.classList.add("notFound");
      }
      main.innerHTML = html;
    });
}
// MOVIE LISTING SCRIPT ENDS HERE

// SEARCH BY MOVIES SCRIPT STARTS HERE
form.addEventListener('submit',function(e) {
		e.preventDefault();
		var searchTerm = search.value;
		if(searchTerm) {
					getMovies(SEARCH_URL+'&query='+searchTerm)
			} else {
					getMovies(API_URL);
		}
});
// SEARCH BY MOVIES SCRIPT ENDS HERE

// CLOSE ICON SCRIPT STARTS HERE
movieCloseBtn.addEventListener('click', function() {
	movieDetails.parentElement.classList.remove('grabMovies')
});
// CLOSE ICON SCRIPT ENDS HERE

// MODAL SCRIPT STARTS HERE
main.addEventListener('click',getMovieItems);
function getMovieItems(e) {
    e.preventDefault();
        if(e.target.classList.contains('movie-btn')) {
            var movieItem = e.target.parentElement.parentElement;
            fetch(`https://api.themoviedb.org/3/movie/${movieItem.dataset.id}?api_key=fcbc8feaaeedb221ba988addb2493764`)
            .then(function(response) {
               return response.json();
            }).then(function(data) {
                  var output = "";
                     if(data) {
                          output += `
                                    <h3>${data.title}</h3>
                                    <div class="movie-overview">
                                        <p>${data.overview}.</p>
                                    </div>
                                    <div class="movie_link btn btn1">
                                         <a href ="${data.homepage}" target="_blank" title="Watch Video">Watch Video</a>
                                    </div>
                           `;      
                       } 
                movieDetails.innerHTML = output;
                movieDetails.parentElement.classList.add('grabMovies');
               });
        }
}
// MODAL SCRIPT ENDS HERE


// LOGIN SCRIPT STARTS HERE
function Login(form) {
  username = new Array("user");
  password = new Array("user");
  if (form.username.value == username[0] && form.password.value == password[0]) {
    location.href='index.html';
    return false;
  }
  else {
    alert("Either the username or password you entered is incorrect.\nPlease try again.");
    form.username.focus();
  }
  return true;
  }

// LOGIN SCRIPT ENDS HERE

// LOGOUT SCRIPT STARTS HERE
logout.addEventListener('click',function(e) {
	location.href="login.html";
	e.preventDefault();
	return false;
})
// LOGOUT SCRIPT ENDS HERE


