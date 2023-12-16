export const favoritesEvents = (params) => {
  return {
    handleSearch: (query) => {
      params.setSearchQuery(query);
    },

    handleClearSearchQuery: () => {
      params.setSearchQuery("");
    },

    filterMoviesBySearchQuery: (movies, searchQuery) => {
      return movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  };
};
