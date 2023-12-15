import PropTypes from "prop-types";
import FavoriteButton from "./components/FavoriteButton";
import { movieCardEvents } from "./constants";
import "./MovieCard.css";

const MovieCard = (props) => {
  const eventHandlers = movieCardEvents({
    movie: props.movie,
  });

  return (
    <div key={props.movie.id} className="movie-card">
      <div className="card-content">
        <img
          className="movie-image"
          src={`https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`}
          alt={props.movie.title}
        />
        <div className="card-footer">
          <h3 className="movie-title">{props.movie.title}</h3>
          <p className="movie-release-date">{props.movie.release_date}</p>
        </div>
        <FavoriteButton
          isFavorite={props.movie.isFavorite}
          handleFavoriteClick={eventHandlers.handleFavoriteClick}
        />
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),
};

export default MovieCard;
