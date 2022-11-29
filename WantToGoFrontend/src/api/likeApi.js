export const LikeApi = {
  addLike: async (like) => {
    await fetch("https://localhost:7158/api/Like", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(like),
    });
  },
  deleteLike: async (likeId) => {
    await fetch(`https://localhost:7158/api/Like/${likeId}`, {
      method: "DELETE",
    });
  },
};
