using System.ComponentModel.DataAnnotations.Schema;

namespace TicketSystem_Backend.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Content { get; set; }
    public short Status { get; set; }

    [Column("created_date")]
    public DateTime CreatedDate { get; set; }

    [Column("updated_date")]
    public DateTime UpdatedDate { get; set; }
}


