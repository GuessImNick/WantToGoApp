export const FavoriteApi = {
  createNewFavorite: async (favorite, token) => {
    await fetch("https://localhost:7158/api/Favorite", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(favorite),
    });
  },

  deleteFavorite: async (favoriteId, token) => {
    await fetch(`https://localhost:7158/api/Favorite/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  },
};
