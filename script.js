let apikey;

const modalBox = document.querySelector(".movie-modal-box");
const handleInput = () => {
  modalBox.style.display = "block";
  const query = document.getElementById("searchInput").value;
  console.log(query);

  let movieUrl = `https://omdbapi.com/?apikey=${apikey}&s=${query}`;

  MovieData(movieUrl);
};

const MovieData = async (movieUrl) => {
  try {
    const response = await fetch(movieUrl);
    const data = await response.json();
    const modalBox = document.querySelector(".movie-modal-box");

    modalBox.innerHTML = "";

    const movieItems = data.Search.map((element) => {
      const movieItem = document.createElement("div");
      movieItem.classList.add("movies");

      const { Title, Year, Type, Poster, imdbID } = element;

      movieItem.innerHTML = `
            <div onclick="handleclick('${imdbID}')" style='display: flex'>
             <div class="poster">
                  <img src=${Poster} alt="">
                </div>
                <div class="details">
                   <h3>${Title}</h3>
                   <p>${Year}</p>
                   <p>${Type}</p>
                </div>
            </div> 
        `;
      return movieItem;
    });

    movieItems.forEach((movieItem) => {
      modalBox.appendChild(movieItem);
    });
  } catch (error) {
    console.log(error);
  }
};

const handleclick = async (imdbID) => {
  const detailsUrl = `https://omdbapi.com/?apikey=${apikey}&i=${imdbID}`;
  const response = await fetch(detailsUrl);
  const data = await response.json();
  modalBox.style.display = "none";
  console.log(data);
  const movieDetailsBox = document.querySelector(".movie_content");

  movieDetailsBox.innerHTML = `
     <div class="banner movie_box">
     <img src= ${
       data.Poster == "N/A"
         ? "https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png"
         : data.Poster
     }
         alt="">
 </div>
 <div class="details movie_box">
     <div class="details_header">
         <h1>${data.Title}</h1>
         <p>${data.imdbRating}</p>
         <p>${data.Genre}</p>
         <p>${data.Type}</p>
         <div class="header-box box">
             <p>${data.Released}</p>
             <p>${data.Runtime}</p>
             <p>${data.BoxOffice}</p>
             <p>${data.Country}</p>
         </div>
     </div>
     <div class="cast box">
         <div class="cast-box">
             <h3>Director</h3>
             <p>${data.Director}</p>
         </div>
         <div class="cast-box">
             <h3>Cast</h3>
             <p>${data.Actors}</p>
         </div>
         <div class="cast-box">
             <h3>Writers</h3>
             <p>${data.Writer}</p>
         </div>
     </div>
     <div class="box-office ">
         <p>${data.Language}</p>
         <p>${data.Awards}</p>
     </div>
     <p class="movie-description">${data.Plot}/p>
 </div>
     `;
};
