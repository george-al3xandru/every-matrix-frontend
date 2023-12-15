import { useState } from "react";
import PropTypes from "prop-types";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./FavoriteButton.css";

const FavoriteButton = (props) => {
  const [active, setActive] = useState(props.isFavorite);

  const toggleActive = () => {
    setActive((prevValue) => !prevValue);
    props.handleFavoriteClick();
  };

  return (
    <div
      className="star"
      onClick={toggleActive}
      data-active={active ? true : undefined}
    >
      {active ? <FaStar /> : <FaRegStar />}
    </div>
  );
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  handleFavoriteClick: PropTypes.func,
};

export default FavoriteButton;
