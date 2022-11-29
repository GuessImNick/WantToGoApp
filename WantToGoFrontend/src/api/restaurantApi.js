export const restaurantApi = {
  getRestaurantList: async (page = 1) => {
    const res = await fetch(
      `https://localhost:7158/api/Restaurant?page=${page}`
    );
    if (res.status === 200) {
      const res2 = await res.json();
      return res2;
    }
  },

  getRestaurantById: async (id) => {
    const res = await fetch(`https://localhost:7158/api/Restaurant/${id}`);
    if (res.status === 200) {
      const res2 = await res.json();
      return res2;
    }
  },
};
