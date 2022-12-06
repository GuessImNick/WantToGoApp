export const ReviewApi = {
  addReview: async (review, token) => {
    await fetch("https://localhost:7158/api/Review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });
  },

  updateReview: async (review, token) => {
    await fetch(`https://localhost:7158/api/Review/${review.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });
  },

  deleteReview: async (reviewId, token) => {
    await fetch(`https://localhost:7158/api/Review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
