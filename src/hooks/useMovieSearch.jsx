import { useState, useEffect } from "react";
import axios from "../api/axios";
import { debounce } from "../utils";

const useMovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  const debouncedSearchQuery = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const handleSearchQuery = (e) => {
    debouncedSearchQuery(e);
  };

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  const searchMovies = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoadingSearch(true);
    try {
      const response = await axios.get(`/search/movie`, {
        params: {
          query: searchQuery,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      setErrorSearch(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const searchMoreMovies = async (page) => {
    if (loadingSearch) return;
    setLoadingSearch(true);

    try {
      const response = await axios.get(`/discover/movie`, {
        params: {
          query: searchQuery,
          include_adult: false,
          language: "en-US",
          page: page,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
        },
      });

      const newSearchResult = response.data.results;

      setSearchResults((prevValues) => [...prevValues, ...newSearchResult]);
    } catch (error) {
      setErrorSearch(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [searchQuery]);

  return {
    searchQuery,
    searchResults,
    loadingSearch,
    errorSearch,
    handleSearchQuery,
    handleClearSearchQuery,
    searchMoreMovies,
  };
};

export default useMovieSearch;
