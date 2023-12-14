import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = (props) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleLeftArrowClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 100;
    }
  };

  const handleRightArrowClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 100;
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-arrow" onClick={handleLeftArrowClick}>
        <FaChevronLeft color="black" />
      </button>
      <div
        className="slider-content"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="slider-arrows"></div>
        {props.children?.map((child, index) => (
          <div key={index} className="slider-slide">
            {child}
          </div>
        ))}
      </div>
      <button className="slider-arrow" onClick={handleRightArrowClick}>
        <FaChevronRight color="black" />
      </button>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Slider;
