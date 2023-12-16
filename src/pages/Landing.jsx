import { FaStar } from "react-icons/fa";
import {
  Loader,
  SearchBar,
  MovieList,
  GenresList,
  ActionIcon,
} from "../components";
import {
  useFetchGenres,
  useFetchMovies,
  useInfiniteScroll,
  useMovieSearch,
} from "../hooks";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
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
      <div style={{ display: "flex", gap: "10px" }}>
        <SearchBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleClearSearchQuery={handleClearSearchQuery}
          clearable
        />
        <ActionIcon
          Icon={FaStar}
          color="#FAB005"
          backgroundColor="#FEF5E1"
          iconSize={18}
          handleClick={() => navigate("/favorites")}
        />
      </div>
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
