import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = (props) => {
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
  }),
};

export default MovieCard;
