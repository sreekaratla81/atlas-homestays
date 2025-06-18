using Atlas.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Atlas.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            // Add services
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(
                        "http://localhost:5173",
                        "https://admin.atlashomestays.com" // add your production domain here later
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            var app = builder.Build();

            // Enable Swagger even in production
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Atlas API v1");
                c.RoutePrefix = "swagger"; // ensures URL ends with /swagger
            });

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Use detailed error page only in development
            }
            app.UseHttpsRedirection();
            app.UseCors();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
