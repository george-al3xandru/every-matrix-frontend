import PropTypes from "prop-types";
import "./Loader.css";

const Loader = (props) => {
  const loaderContainerStyle = {
    justifyContent: props.alignment,
  };

  const loaderStyle = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };

  return (
    <div className="loader-container" style={loaderContainerStyle}>
      <span className="loader" style={loaderStyle}></span>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  alignment: PropTypes.string,
};

Loader.defaultProps = {
  size: 38,
  alignment: "center",
};

export default Loader;
