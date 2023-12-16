export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  const existingFavorites = favoritesJSON ? JSON.parse(favoritesJSON) : [];
  return existingFavorites;
};
