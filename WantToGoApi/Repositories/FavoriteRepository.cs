using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Data.SqlClient;
using WantToGoApi.Interface;
using WantToGoApi.Models;

namespace WantToGoApi.Repositories
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly IConfiguration _config;

        public FavoriteRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Favorite> GetAllFavorites()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												restaurantId 
										FROM [Favorite]
									  ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Favorite> favorites = new List<Favorite>();
                        while (reader.Read())
                        {
                            Favorite favorite = new Favorite()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                RestaurantId = reader.GetString(reader.GetOrdinal("restaurantId"))
                            };
                            favorites.Add(favorite);
                        }
                        return favorites;
                    }

                }
            }
        }

        public List<Favorite> GetFavoritesByUserId(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												restaurantId
										FROM [Favorite]
                                        WHERE userId = @userId
									  ";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Favorite> favorites = new List<Favorite>();
                        while (reader.Read())
                        {
                            Favorite favorite = new Favorite()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                RestaurantId = reader.GetString(reader.GetOrdinal("restaurantId"))
                            };
                            favorites.Add(favorite);
                        }
                        return favorites;
                    }

                }
            }
        }

        public int AddFavorite(Favorite favorite)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
											INSERT INTO [Favorite] 
															(userId, 
												            restaurantId)
											OUTPUT INSERTED.ID
											VALUES (@userId, @restaurantId)
											"
                    ;

                    cmd.Parameters.AddWithValue("@userId", favorite.UserId);
                    cmd.Parameters.AddWithValue("@restaurantId", favorite.RestaurantId);

                    return (int)cmd.ExecuteScalar();

                }
            }
        }

        public int DeleteFavorite(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
								DELETE FROM [Favorite]
								WHERE Id = @id
							 ";

                    cmd.Parameters.AddWithValue("@id", id);

                    return cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
