using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WantToGoApi.Interface;
using WantToGoApi.Repositories;

var builder = WebApplication.CreateBuilder(args);
var WantToGoApi = "_wantToGoApi";


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile(builder.Configuration.GetValue<string>("GoogleCredentialPath"))
});
var firebaseProjectId = builder.Configuration.GetValue<string>("FirebaseProjectId");
var googleTokenUrl = $"https://securetoken.google.com/{firebaseProjectId}";
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = googleTokenUrl;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = googleTokenUrl,
            ValidateAudience = true,
            ValidAudience = firebaseProjectId,
            ValidateLifetime = true
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: WantToGoApi,
                      policy =>
                      {
                          policy.WithOrigins(builder.Configuration.GetValue<string>("BackendPort"),
                                              builder.Configuration.GetValue<string>("FrontendPort"))
                                .AllowAnyHeader()
                                .WithMethods("GET", "POST", "PUT", "DELETE")
                                .WithExposedHeaders("*");
                      });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Start AddTransient
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IReviewRepository, ReviewRepository>();
// End AddTransient

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
