import PropTypes from "prop-types";
import { MovieCard } from "../MovieCard";
import { Grid } from "../Grid";
import { movieListEvents } from "./constants";

const MovieList = (props) => {
  const eventHandlers = movieListEvents();

  const movieList = props.movies?.map((movie) => (
    <MovieCard
      key={movie.id}
      movie={{
        ...movie,
        isFavorite: eventHandlers.isMovieInFavorites(movie.id),
      }}
    />
  ));

  return <Grid>{movieList}</Grid>;
};

MovieList.propTypes = {
  movies: PropTypes.array,
  isMovieInFavorites: PropTypes.func,
};

export default MovieList;
