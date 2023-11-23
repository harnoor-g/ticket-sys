using System.ComponentModel.DataAnnotations;

namespace TicketSystem_Backend.Models;

public class TicketDTO
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public string? Content { get; set; }
    [Required]
    public short Status { get; set; }
}