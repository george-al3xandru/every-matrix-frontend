import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import { ActionIcon, MovieList, SearchBar } from "../components";
import { getFavoritesFromLocalStorage } from "../utils";
import { favoritesEvents } from "./constants";

const Favorites = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const eventHandlers = favoritesEvents({
    setSearchQuery,
  });

  const existingFavorites = getFavoritesFromLocalStorage();
  const filteredMovies = eventHandlers.filterMoviesBySearchQuery(
    existingFavorites,
    searchQuery
  );

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <SearchBar
          searchQuery={searchQuery}
          handleSearch={eventHandlers.handleSearch}
          handleClearSearchQuery={eventHandlers.handleClearSearchQuery}
          clearable
        />
        <ActionIcon
          Icon={MdOutlineExplore}
          color="#52C667"
          backgroundColor="#ECF9EE"
          iconSize={24}
          handleClick={() => navigate("/")}
        />
      </div>
      {filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        <p style={{ textAlign: "center", paddingTop: "10px" }}>
          There are no movies
        </p>
      )}
    </>
  );
};

export default Favorites;
