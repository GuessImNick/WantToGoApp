export const ReviewApi = {
  addReview: async (review) => {
    await fetch("https://localhost:7158/api/Review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    });
  },

  updateReview: async (review) => {
    await fetch(`https://localhost:7158/api/Review/${review.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    });
  },

  deleteReview: async (reviewId) => {
    await fetch(`https://localhost:7158/api/Review/${reviewId}`, {
      method: "DELETE",
    });
  },
};
