using System.Data.SqlClient;
using WantToGoApi.Interface;
using WantToGoApi.Models;

namespace WantToGoApi.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly IConfiguration _config;
        private ILikeRepository _likeRepo;

        public ReviewRepository(IConfiguration config, ILikeRepository likeRepo)
        {
            _config = config;
            _likeRepo = likeRepo;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Review> GetAllReviews()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												restaurantId, 
												reviewText
										FROM [Review]
									  ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Review> reviews = new List<Review>();
                        while (reader.Read())
                        {
                            Review review = new Review()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                RestaurantId = reader.GetString(reader.GetOrdinal("restaurantId")),
                                ReviewText = reader.GetString(reader.GetOrdinal("reviewText")),
                                Likes = _likeRepo.GetByReviewId(reader.GetInt32(reader.GetOrdinal("id")))
                            };
                            reviews.Add(review);
                        }
                        return reviews;
                    }

                }
            }
        }

        public Review GetReviewById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												restaurantId, 
												reviewText
										FROM [Review]
										WHERE id = @id
									  ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Review review = new Review()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                RestaurantId = reader.GetString(reader.GetOrdinal("restaurantId")),
                                ReviewText = reader.GetString(reader.GetOrdinal("reviewText")),
                                Likes = _likeRepo.GetByReviewId(reader.GetInt32(reader.GetOrdinal("id")))
                            };
                            return review;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
        }

        public List<Review> GetReviewsByRestaurantId(string restaurantId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												restaurantId, 
												reviewText
										FROM [Review]
										WHERE restaurantId = @restaurantId
									  ";

                    cmd.Parameters.AddWithValue("@restaurantId", restaurantId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Review> reviews = new List<Review>();
                        while (reader.Read())
                        {
                            Review review = new Review()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                RestaurantId = reader.GetString(reader.GetOrdinal("restaurantId")),
                                ReviewText = reader.GetString(reader.GetOrdinal("reviewText")),
                                Likes = _likeRepo.GetByReviewId(reader.GetInt32(reader.GetOrdinal("id")))
                            };
                            reviews.Add(review);
                        }
                        return reviews;
                    }

                }
            }
        }
        public int AddReview(Review review)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
											INSERT INTO [Review] 
															(userId, 
												            restaurantId, 
												            reviewText)
											OUTPUT INSERTED.ID
											VALUES (@userId, @restaurantId, @reviewText)
											";

                    cmd.Parameters.AddWithValue("@userId", review.UserId);
                    cmd.Parameters.AddWithValue("@restaurantId", review.RestaurantId);
                    cmd.Parameters.AddWithValue("@reviewText", review.ReviewText);

                   return (int)cmd.ExecuteScalar();
                    
                }
            }

        }
        public int UpdateReview(int id, Review review)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
										UPDATE [Review]
										SET userId = @userId,
											restaurantId = @restaurantId,
											reviewText = @reviewText
										WHERE Id = @id
										";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userId", review.UserId);
                    cmd.Parameters.AddWithValue("@restaurantId", review.RestaurantId);
                    cmd.Parameters.AddWithValue("@reviewText", review.ReviewText);

                    return cmd.ExecuteNonQuery();
                }
            }
        }

        public int DeleteReview(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
								DELETE FROM [Review]
								WHERE Id = @id
							 ";

                    cmd.Parameters.AddWithValue("@id", id);

                    return cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
