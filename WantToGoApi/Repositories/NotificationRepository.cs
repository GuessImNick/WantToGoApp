using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Data.SqlClient;
using WantToGoApi.Interface;
using WantToGoApi.Models;
using Notification = WantToGoApi.Models.Notification;

namespace WantToGoApi.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IConfiguration _config;

        public NotificationRepository(IConfiguration config)
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

        public List<Notification> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												senderId, 
												type,
                                                isViewed
										FROM [Notification]
									  ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Notification> notifications = new List<Notification>();
                        while (reader.Read())
                        {
                            Notification notification = new Notification()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                SenderId = reader.GetInt32(reader.GetOrdinal("senderId")),
                                Type = reader.GetString(reader.GetOrdinal("type")),
                                IsViewed = reader.GetBoolean(reader.GetOrdinal("isViewed"))
                            };
                            notifications.Add(notification);
                        }
                        return notifications;
                    }

                }
            }
        }
        public List<Notification> GetByUserId(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												userId, 
												senderId, 
												type,
                                                isViewed
										FROM [Notification]
                                        WHERE userId = @userId
									  ";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Notification> notifications = new List<Notification>();
                        while (reader.Read())
                        {
                            Notification notification = new Notification()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                SenderId = reader.GetInt32(reader.GetOrdinal("senderId")),
                                Type = reader.GetString(reader.GetOrdinal("type")),
                                IsViewed = reader.GetBoolean(reader.GetOrdinal("isViewed"))
                            };
                            notifications.Add(notification);
                        }
                        return notifications;
                    }

                }
            }
        }
        public int AddNotification(Notification notification)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
											INSERT INTO [Notification] 
															(userId, 
												            senderId, 
												            type,
                                                            isViewed)
											OUTPUT INSERTED.ID
											VALUES (@userId, @senderId, @type, @isViewed)
											"
                    ;

                    cmd.Parameters.AddWithValue("@userId", notification.UserId);
                    cmd.Parameters.AddWithValue("@senderId", notification.SenderId);
                    cmd.Parameters.AddWithValue("@type", notification.Type);
                    cmd.Parameters.AddWithValue("@isViewed", notification.IsViewed);

                    return (int)cmd.ExecuteScalar();

                }
            }
        }

        public int UpdateNotification(int id, Notification notification)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
										UPDATE [Notification]
										SET userId = @userId,
											senderId = @senderId,
											type = @type,
											isViewed = @isViewed
										WHERE Id = @id
										";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userId", notification.UserId);
                    cmd.Parameters.AddWithValue("@senderId", notification.SenderId);
                    cmd.Parameters.AddWithValue("@type", notification.Type);
                    cmd.Parameters.AddWithValue("@isViewed", notification.IsViewed);

                    return cmd.ExecuteNonQuery();
                }
            }
        }

        public int DeleteNotification(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
								DELETE FROM [Notification]
								WHERE Id = @id
							 ";

                    cmd.Parameters.AddWithValue("@id", id);

                    return cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
