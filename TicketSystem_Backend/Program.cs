using Microsoft.EntityFrameworkCore;
using TicketSystem_Backend.Models;

var builder = WebApplication.CreateBuilder(args);

string frontendPolicyName = "FrontendPolicy";

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<TicketContext>(options => options.UseInMemoryDatabase("TicketList"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendPolicyName,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(frontendPolicyName);

app.UseAuthorization();

app.MapControllers();

app.Run();
