import {
  Badge,
  Grid,
  Loader,
  MovieCard,
  SearchBar,
  Slider,
} from "../components";
import { useFetchGenres } from "../hooks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useFetchMovies from "../hooks/useFetchMovies";

const Landing = () => {
  const { genres, activeGenre, loadingGenres, errorGenres, handleActiveGenre } =
    useFetchGenres();
  const { movies, loading, error, loadMoreMovies } =
    useFetchMovies(activeGenre);

  const { resetPageNumber } = useInfiniteScroll(loadMoreMovies, 300);

  const handleGenreSelection = (genreId) => {
    handleActiveGenre(genreId);
    resetPageNumber();
  };

  if (loadingGenres) {
    return <Loader />;
  }

  if (errorGenres) {
    return <div>Error: {error.message}</div>;
  }

  const genresList = genres?.map((genre) => (
    <Badge
      key={genre.id}
      active={genre.id === activeGenre}
      onClick={() => handleGenreSelection(genre.id)}
    >
      {genre.name}
    </Badge>
  ));

  const movieList = movies?.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <>
      <SearchBar clearable />
      <Slider>{genresList}</Slider>
      <Grid>{movieList}</Grid>
      {loading && <Loader />}
    </>
  );
};

export default Landing;
