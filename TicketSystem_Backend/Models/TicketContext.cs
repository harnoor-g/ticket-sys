using Microsoft.EntityFrameworkCore;

namespace TicketSystem_Backend.Models;

public class TicketContext : DbContext
{
    public TicketContext(DbContextOptions<TicketContext> options) : base(options) { }

    public DbSet<Ticket> Tickets { get; set; } = null!;
}
