
using DtuChatBot.Models;
using DtuChatBot.Services.AccountServices;
using DtuChatBot.Services.ChatDetailService;
using DtuChatBot.Services;
using System.Text.Json.Serialization;

namespace DtuChatBot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<DtuchatbotContext>();
            builder.Services.AddAutoMapper(typeof(Program).Assembly);

            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddScoped<AccountService, AccountService>();
            builder.Services.AddScoped<ChatDetailService, ChatDetailService>();
            builder.Services.AddScoped<ChatService, ChatService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("*")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                  });
            });

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
