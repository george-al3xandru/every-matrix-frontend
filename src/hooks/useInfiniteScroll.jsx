import { useEffect, useState } from "react";

const useInfiniteScroll = (loadMoreFunction, debounceDelay) => {
  const [page, setPage] = useState(1);

  const resetPageNumber = () => {
    setPage(1);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const shouldLoadMore = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      const nextPage = page + 1;
      loadMoreFunction(nextPage);
      setPage(nextPage);
    }
  };

  const handleScroll = debounce(() => shouldLoadMore(), debounceDelay);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { resetPageNumber };
};

export default useInfiniteScroll;