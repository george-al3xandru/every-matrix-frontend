import { useState, useEffect } from "react";
import axios from "../api/axios";

const useFetchMovies = (activeGenre) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    if (!activeGenre) return;
    setLoading(true);

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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async (page) => {
    if (loading) return;
    setLoading(true);

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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [activeGenre]);

  return { movies, loading, error, loadMoreMovies };
};

export default useFetchMovies;
