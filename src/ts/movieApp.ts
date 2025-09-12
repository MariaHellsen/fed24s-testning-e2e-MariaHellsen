import { IMovie } from "./models/Movie";
import { getData } from "./services/movieService";
import { movieSort } from "./functions.ts";

let movies: IMovie[] = [];
let isDescending = true;

export const init = () => {
  let form = document.getElementById("searchForm") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      handleSubmit();
    });
  }

  let sortButton = document.getElementById("sort") as HTMLButtonElement;
  if (sortButton) {
    sortButton.addEventListener("click", handleSort);
  }
};

export async function handleSubmit() {
  let searchText = (document.getElementById("searchText") as HTMLInputElement)
    .value;

  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  container.innerHTML = "";

  try {
    movies = await getData(searchText);

    if (movies.length > 0) {
      createHtml(movies, container);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
}

function handleSort() {
  if (movies.length === 0) {
    return;
  }

  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  const sortedMovies = movieSort(movies, isDescending);
  container.innerHTML = "";
  createHtml(sortedMovies, container);
  isDescending = !isDescending;
}

export const createHtml = (movies: IMovie[], container: HTMLDivElement) => {
  for (let i = 0; i < movies.length; i++) {
    let movie = document.createElement("div");
    let title = document.createElement("h3");
    let img = document.createElement("img");

    movie.classList.add("movie");
    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    movie.appendChild(title);
    movie.appendChild(img);

    container.appendChild(movie);
  }
};

export const displayNoResult = (container: HTMLDivElement) => {
  let noMessage = document.createElement("p");

  noMessage.innerHTML = "Inga sökresultat att visa";

  container.appendChild(noMessage);
};
