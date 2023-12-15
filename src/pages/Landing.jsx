import { Loader, SearchBar, MovieList, GenresList } from "../components";
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
    loadingSearchMore,
    errorSearch,
    handleSearchQuery,
    handleClearSearchQuery,
    searchMoreMovies,
  } = useMovieSearch();
  const {
    movies,
    loadingMovies,
    loadingMoreMovies,
    errorMovies,
    fetchMoreMovies,
  } = useFetchMovies(activeGenre);

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

  const error = errorGenres || errorMovies || errorSearch;
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const listToRender = searchQuery ? searchResults : movies;

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleClearSearchQuery={handleClearSearchQuery}
        clearable
      />
      {!searchQuery && (
        <GenresList
          genres={genres}
          activeGenre={activeGenre}
          handleGenreSelection={handleGenreSelection}
        />
      )}
      {loadingSearch || loadingMovies ? (
        <Loader />
      ) : (
        <MovieList movies={listToRender} />
      )}
      {(loadingMoreMovies || loadingSearchMore) && <Loader />}
    </>
  );
};

export default Landing;
