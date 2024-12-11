using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Sites")]
public class Sites
{
    [Key]
    public int id { get; set; }
    public string Name { get; set; }
    public string Region { get; set; }
    public string User { get; set; }
    public DateTime LastUpdate { get; set; }
    public string Active { get; set; }
}