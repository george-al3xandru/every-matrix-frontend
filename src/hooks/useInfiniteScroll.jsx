import { useEffect, useState } from "react";
import { debounce } from "../utils";

const useInfiniteScroll = (loadMoreFunction, debounceDelay) => {
  const [page, setPage] = useState(1);

  const resetPageNumber = () => {
    setPage(1);
  };

  const shouldLoadMore = () => {
    if (
      window.innerHeight + window.scrollY + 50 >=
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
    window.addEventListener("touchend", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchend", handleScroll);
    };
  }, [handleScroll]);

  return { resetPageNumber };
};

export default useInfiniteScroll;
