import { useState, useEffect } from "react";
import axios from "../api/axios";

const useFetchMovies = (activeGenre) => {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
  const [errorMovies, setErrorMovies] = useState(null);

  const fetchMovies = async () => {
    if (!activeGenre) return;
    setLoadingMovies(true);

    try {
      const response = await axios.get(`/discover/movie`, {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: 1,
          sort_by: "popularity.desc",
          with_genres: activeGenre,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
        },
      });

      setMovies(response.data.results);
    } catch (error) {
      setErrorMovies(error);
    } finally {
      setLoadingMovies(false);
    }
  };

  const fetchMoreMovies = async (page) => {
    if (loadingMovies || loadingMoreMovies) return;
    setLoadingMoreMovies(true);

    try {
      const response = await axios.get(`/discover/movie`, {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: page,
          sort_by: "popularity.desc",
          with_genres: activeGenre,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
        },
      });

      const newMovies = response.data.results;

      setMovies((prevValues) => [...prevValues, ...newMovies]);
    } catch (error) {
      setErrorMovies(error);
    } finally {
      setLoadingMoreMovies(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [activeGenre]);

  return {
    movies,
    loadingMovies,
    loadingMoreMovies,
    errorMovies,
    fetchMoreMovies,
  };
};

export default useFetchMovies;
