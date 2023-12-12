import { useEffect, useState } from "react";
import { Grid, MovieCard, SearchBar } from "../components";
import axios from "../api/axios";

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // New loading state for loadMoreMovies
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/discover/movie`, {
          params: {
            include_adult: false,
            include_video: false,
            language: "en-US",
            page: page,
            sort_by: "popularity.desc",
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
          },
        });

        setMovies((prevValues) => [...prevValues, ...response.data.results]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Detect when the bottom of the Grid is reached
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        const nextPage = page + 1;
        loadMoreMovies(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  // Fetch the next page of movies
  const loadMoreMovies = async (page) => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const response = await axios.get(`/discover/movie`, {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: page,
          sort_by: "popularity.desc",
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`,
        },
      });

      const newMovies = response.data.results;

      setMovies((prevValues) => [...prevValues, ...newMovies]);
      setPage((prevValue) => prevValue + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const movieList = movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <>
      <SearchBar clearable />
      <Grid>{movieList}</Grid>
      {loadingMore && <div>Loading more...</div>}
    </>
  );
};

export default Landing;
