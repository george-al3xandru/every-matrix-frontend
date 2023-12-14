import { useEffect, useState } from "react";
import axios from "../api/axios";

const useFetchGenres = () => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(undefined);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [errorGenres, setErrorGenres] = useState(null);

  const handleActiveGenre = (id) => {
    setActiveGenre(id);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`/genre/movie/list`, {
          params: {
            language: "en-US",
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
          },
        });

        setGenres(response.data.genres);
        setActiveGenre(response.data.genres[0].id);
      } catch (error) {
        setErrorGenres(error);
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, activeGenre, loadingGenres, errorGenres, handleActiveGenre };
};

export default useFetchGenres;
