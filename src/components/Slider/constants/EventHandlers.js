export const sliderEvents = (params) => {
  const moveSlider = (x) => {
    const walk = (x - params.startX) * 1.5;
    params.sliderRef.current.scrollLeft = params.scrollLeft - walk;
  };

  const startDragging = (x) => {
    params.setIsDragging(true);
    params.setStartX(x);
    params.setScrollLeft(params.sliderRef.current.scrollLeft);
  };

  return {
    handleMouseDown: (e) => {
      startDragging(e.pageX - params.sliderRef.current.offsetLeft);
    },

    handleMouseMove: (e) => {
      if (!params.isDragging) return;
      const x = e.pageX - params.sliderRef.current.offsetLeft;
      moveSlider(x);
    },

    handleMouseUp: () => {
      params.setIsDragging(false);
    },

    handleTouchStart: (e) => {
      startDragging(e.touches[0].pageX - params.sliderRef.current.offsetLeft);
    },

    handleTouchMove: (e) => {
      if (!params.isDragging) return;
      const x = e.touches[0].pageX - params.sliderRef.current.offsetLeft;
      moveSlider(x);
    },

    handleLeftArrowClick: () => {
      if (params.sliderRef.current) {
        const currentScrollLeft = params.sliderRef.current.scrollLeft;
        const scrollAmount = currentScrollLeft - 150;

        params.sliderRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    },

    handleRightArrowClick: () => {
      if (params.sliderRef.current) {
        const currentScrollLeft = params.sliderRef.current.scrollLeft;
        const scrollAmount = currentScrollLeft + 150;

        params.sliderRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    },
  };
};
