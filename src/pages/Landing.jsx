import {
  Badge,
  Grid,
  Loader,
  MovieCard,
  SearchBar,
  Slider,
} from "../components";
import {
  useFetchGenres,
  useFetchMovies,
  useInfiniteScroll,
  useMovieSearch,
} from "../hooks";

const Landing = () => {
  const { genres, activeGenre, loadingGenres, errorGenres, handleActiveGenre } =
    useFetchGenres();
  const {
    searchQuery,
    searchResults,
    loadingSearch,
    errorSearch,
    handleSearchQuery,
    handleClearSearchQuery,
    searchMoreMovies,
  } = useMovieSearch();
  const { movies, loadingMovies, errorMovies, fetchMoreMovies } =
    useFetchMovies(activeGenre);

  const handleInfiniteScroll = searchQuery ? searchMoreMovies : fetchMoreMovies;
  const { resetPageNumber } = useInfiniteScroll(handleInfiniteScroll, 300);

  const handleSearch = (e) => {
    handleSearchQuery(e);
    resetPageNumber();
  };

  const handleGenreSelection = (genreId) => {
    handleActiveGenre(genreId);
    resetPageNumber();
  };

  if (loadingGenres) {
    return <Loader />;
  }

  if (errorGenres || errorMovies) {
    return (
      <div>
        Error: {errorGenres ? errorGenres.message : errorMovies.message}
      </div>
    );
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

  const movieList = searchQuery
    ? searchResults?.map((result) => (
        <MovieCard key={result.id} movie={result} />
      ))
    : movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleClearSearchQuery={handleClearSearchQuery}
        clearable
      />
      {!searchQuery && <Slider>{genresList}</Slider>}
      <Grid>{movieList}</Grid>
      {loadingMovies && <Loader />}
    </>
  );
};

export default Landing;
