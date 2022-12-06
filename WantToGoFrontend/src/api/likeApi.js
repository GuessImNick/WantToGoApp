export const LikeApi = {
  addLike: async (like, token) => {
    await fetch("https://localhost:7158/api/Like", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(like),
    });
  },
  deleteLike: async (likeId, token) => {
    await fetch(`https://localhost:7158/api/Like/${likeId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },
};
