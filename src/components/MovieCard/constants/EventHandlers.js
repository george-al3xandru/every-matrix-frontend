import { getFavoritesFromLocalStorage } from "../../../utils";

export const movieCardEvents = (params) => {
  return {
    handleFavoriteClick: () => {
      const existingFavorites = getFavoritesFromLocalStorage();
      const movieIndex = existingFavorites.findIndex(
        (fav) => fav.id === params.movie.id
      );

      if (movieIndex !== -1) {
        existingFavorites.splice(movieIndex, 1);
      } else {
        existingFavorites.push(params.movie);
      }

      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    },
  };
};
