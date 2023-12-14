import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { sliderEvents } from "./constants";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = (props) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const eventHandlers = sliderEvents({
    isDragging,
    setIsDragging,
    startX,
    setStartX,
    scrollLeft,
    setScrollLeft,
    sliderRef,
  });

  return (
    <div className="slider-container">
      <button
        className="slider-arrow"
        onClick={eventHandlers.handleLeftArrowClick}
      >
        <FaChevronLeft color="black" />
      </button>
      <div
        className="slider-content"
        ref={sliderRef}
        onMouseDown={eventHandlers.handleMouseDown}
        onMouseMove={eventHandlers.handleMouseMove}
        onMouseUp={eventHandlers.handleMouseUp}
        onMouseLeave={eventHandlers.handleMouseUp}
        onTouchStart={eventHandlers.handleTouchStart}
        onTouchMove={eventHandlers.handleTouchMove}
        onTouchEnd={eventHandlers.handleMouseUp}
      >
        <div className="slider-arrows"></div>
        {props.children?.map((child, index) => (
          <div key={index} className="slider-slide">
            {child}
          </div>
        ))}
      </div>
      <button
        className="slider-arrow"
        onClick={eventHandlers.handleRightArrowClick}
      >
        <FaChevronRight color="black" />
      </button>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Slider;
