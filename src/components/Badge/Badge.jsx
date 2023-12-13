import PropTypes from "prop-types";
import "./Badge.css";

const Badge = (props) => {
  return (
    <div className="badge-root">
      <span className="badge-content">{props.children}</span>
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Badge;
