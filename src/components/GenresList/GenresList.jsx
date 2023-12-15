import PropTypes from "prop-types";
import { Badge } from "../Badge";
import { Slider } from "../Slider";

const GenresList = (props) => {
  const genresList = props.genres?.map((genre) => (
    <Badge
      key={genre.id}
      active={genre.id === props.activeGenre}
      onClick={() => props.handleGenreSelection(genre.id)}
    >
      {genre.name}
    </Badge>
  ));

  return <Slider>{genresList}</Slider>;
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  activeGenre: PropTypes.number,
  handleGenreSelection: PropTypes.func.isRequired,
};

export default GenresList;
