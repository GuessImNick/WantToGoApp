using System.Data.SqlClient;
using WantToGoApi.Interface;
using WantToGoApi.Models;

namespace WantToGoApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
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

        public List<User> GetAllUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												firebaseUid, 
												firstName, 
												lastName,
												dob,
                                                isAdmin
										FROM [User]
									  ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<User> users = new List<User>();
                        while (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                FirebaseUid = reader.GetString(reader.GetOrdinal("firebaseUid")),
                                FirstName = reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader.GetString(reader.GetOrdinal("lastName")),
                                Dob = reader.GetString(reader.GetOrdinal("dob")),
                                IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin"))
                            };
                            users.Add(user);
                        }
                        return users;
                    }

                }
            }
        }
        public User GetUserById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												firebaseUid, 
												firstName, 
												lastName,
												dob,
                                                isAdmin
										FROM [User]
										WHERE id = @id
									  ";

                    cmd.Parameters.AddWithValue("@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                FirebaseUid = reader.GetString(reader.GetOrdinal("firebaseUid")),
                                FirstName = reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader.GetString(reader.GetOrdinal("lastName")),
                                Dob = reader.GetString(reader.GetOrdinal("dob")),
                                IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin"))
                            };
                            return user;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
        }
        public User GetUserByFirebaseId(string firebaseUserUid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												firebaseUid, 
												firstName, 
												lastName,
												dob,
                                                isAdmin
								FROM [User]
								WHERE firebaseUid = @FirebaseUid
							  ";


                    cmd.Parameters.AddWithValue("@FirebaseUid", firebaseUserUid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                FirebaseUid = reader.GetString(reader.GetOrdinal("firebaseUid")),
                                FirstName = reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader.GetString(reader.GetOrdinal("lastName")),
                                Dob = reader.GetString(reader.GetOrdinal("dob")),
                                IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin"))
                            };
                            return user;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
        }
        public int AddUser(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
											INSERT INTO [User] 
															(firebaseUid, 
												            firstName, 
												            lastName,
												            dob,
                                                            isAdmin)
											OUTPUT INSERTED.ID
											VALUES (@firebaseUid, @firstName, @lastName, @dob, @isAdmin)
											";

                    cmd.Parameters.AddWithValue("@firebaseUid", user.FirebaseUid);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName);
                    cmd.Parameters.AddWithValue("@dob", user.Dob);
                    cmd.Parameters.AddWithValue("@isAdmin", user.IsAdmin);

                    return (int)cmd.ExecuteScalar();

                }
            }

        }
        public int UpdateUser(int id, User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
										UPDATE [User]
										SET firebaseUid = @firebaseUid,
											firstName = @firstName,
											lastName = @lastname,
											dob = @dob,
                                            isAdmin = @isAdmin
										WHERE Id = @id
										";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@firebaseUid", user.FirebaseUid);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName);
                    cmd.Parameters.AddWithValue("@dob", user.Dob);
                    cmd.Parameters.AddWithValue("@isAdmin", user.IsAdmin);

                    return cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
