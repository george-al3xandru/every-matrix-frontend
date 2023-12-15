export const movieCardEvents = (params) => {
  return {
    handleFavoriteClick: () => {
      const existingFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const movieIndex = existingFavorites.findIndex((fav) => fav.id === params.movie.id);

      if (movieIndex !== -1) {
        existingFavorites.splice(movieIndex, 1);
      } else {
        existingFavorites.push(params.movie);
      }

      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    },
  };
};