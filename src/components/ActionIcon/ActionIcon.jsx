import PropTypes from "prop-types";
import "./ActionIcon.css";

const ActionIcon = (props) => {
  const actionIconRootStyle = {
    color: props.color,
    backgroundColor: props.backgroundColor,
  };

  return (
    <div
      className="action-icon-root"
      style={actionIconRootStyle}
      onClick={props.handleClick}
    >
      <props.Icon size={props.iconSize} />
    </div>
  );
};

ActionIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  iconSize: PropTypes.number,
};

export default ActionIcon;
