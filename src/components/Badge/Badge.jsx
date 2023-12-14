import PropTypes from "prop-types";
import "./Badge.css";

const Badge = (props) => {
  return (
    <div
      className="badge-root"
      data-active={props.active ? true : undefined}
      onClick={props.onClick}
    >
      <span className="badge-content">{props.children}</span>
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Badge;
