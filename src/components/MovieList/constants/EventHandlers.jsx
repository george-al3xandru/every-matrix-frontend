export const movieListEvents = () => {
  return {
    isMovieInFavorites: (movieId) => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return favorites.some((fav) => fav.id === movieId);
    },
  };
};
