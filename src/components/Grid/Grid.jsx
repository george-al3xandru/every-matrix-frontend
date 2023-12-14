import PropTypes from "prop-types";
import "./Grid.css";

const Grid = (props) => {
  return <div className="grid-system">{props.children}</div>;
};

Grid.propTypes = {
  children: PropTypes.node,
};

export default Grid;
