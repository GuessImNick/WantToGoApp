﻿using System.Data.SqlClient;
using WantToGoApi.Interface;
using WantToGoApi.Models;

namespace WantToGoApi.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly IConfiguration _config;
        private IReviewRepository _reviewRepo;

        public RestaurantRepository(IConfiguration config, IReviewRepository reviewRepo)
        {
            _config = config;
            _reviewRepo = reviewRepo;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Restaurant> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												name, 
												categories, 
												address,
                                                city,
                                                state,
                                                zip,
                                                latitude,
                                                longitude
										FROM [Restaurant]
                                        ORDER BY(SELECT NULL)
                                        OFFSET 0 ROWS
                                        FETCH NEXT 100 ROWS ONLY
									  ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Restaurant> restaurants = new List<Restaurant>();
                        while (reader.Read())
                        {
                            Restaurant restaurant = new Restaurant()
                            {
                                Id = reader.GetString(reader.GetOrdinal("id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Categories = reader.GetString(reader.GetOrdinal("categories")),
                                Address = reader.GetString(reader.GetOrdinal("address")),
                                City = reader.GetString(reader.GetOrdinal("city")),
                                State = reader.GetString(reader.GetOrdinal("state")),
                                Zip = reader.GetString(reader.GetOrdinal("zip")),
                                Latitude = reader.GetString(reader.GetOrdinal("latitude")),
                                Longitude = reader.GetString(reader.GetOrdinal("longitude")),
                                Reviews = _reviewRepo.GetReviewsByRestaurantId(reader.GetString(reader.GetOrdinal("id")))
                            };

                            restaurants.Add(restaurant);
                        }
                        return restaurants;
                    }

                }
            }

        }

        public Restaurant GetById(string id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												name, 
												categories, 
												address,
                                                city,
                                                state,
                                                zip,
                                                latitude,
                                                longitude
										FROM [Restaurant]
                                        WHERE id = @id
									  ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Restaurant restaurant = new Restaurant()
                            {
                                Id = reader.GetString(reader.GetOrdinal("id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Categories = reader.GetString(reader.GetOrdinal("categories")),
                                Address = reader.GetString(reader.GetOrdinal("address")),
                                City = reader.GetString(reader.GetOrdinal("city")),
                                State = reader.GetString(reader.GetOrdinal("state")),
                                Zip = reader.GetString(reader.GetOrdinal("zip")),
                                Latitude = reader.GetString(reader.GetOrdinal("latitude")),
                                Longitude = reader.GetString(reader.GetOrdinal("longitude")),
                                Reviews = _reviewRepo.GetReviewsByRestaurantId(reader.GetString(reader.GetOrdinal("id")))
                            };
                            return restaurant;
                        }
                        else
                        {
                            return null;
                        }
                       
                    }

                }
            }
        }
    }
}
