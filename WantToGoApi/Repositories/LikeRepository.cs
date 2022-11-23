using System.Data.SqlClient;
using WantToGoApi.Interface;
using WantToGoApi.Models;

namespace WantToGoApi.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private readonly IConfiguration _config;

        public LikeRepository(IConfiguration config)
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

        public List<Like> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												reviewId 
										FROM [Like]
									  ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Like> likes = new List<Like>();
                        while (reader.Read())
                        {
                            Like like = new Like()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                ReviewId = reader.GetInt32(reader.GetOrdinal("reviewId"))
                            };
                            likes.Add(like);
                        }
                        return likes;
                    }

                }
            }
        }

        public List<Like> GetByReviewId(int reviewId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												reviewId 
										FROM [Like]
                                        WHERE reviewId = @reviewId
									  ";
                    cmd.Parameters.AddWithValue("@reviewId", reviewId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Like> likes = new List<Like>();
                        while (reader.Read())
                        {
                            Like like = new Like()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                ReviewId = reader.GetInt32(reader.GetOrdinal("reviewId"))
                            };
                            likes.Add(like);
                        }
                        return likes;
                    }

                }
            }
        }

        public int AddLike(Like like)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
											INSERT INTO [Like] 
															(userId, 
												            reviewId)
											OUTPUT INSERTED.ID
											VALUES (@userId, @reviewId)
											"
                    ;

                    cmd.Parameters.AddWithValue("@userId", like.UserId);
                    cmd.Parameters.AddWithValue("@reviewId", like.ReviewId);

                    return (int)cmd.ExecuteScalar();

                }
            }
        }

        public int DeleteLike(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
								DELETE FROM [Like]
								WHERE Id = @id
							 ";

                    cmd.Parameters.AddWithValue("@id", id);

                    return cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
