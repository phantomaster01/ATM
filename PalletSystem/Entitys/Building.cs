using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Building")]
public class Building
{
    [Key]
    public int id { get; set; }
    public string Name { get; set; }
    public int Site {  get; set; }
    public string User { get; set; }
    public DateTime LastUpdate { get; set; }
    public int Active { get; set; }
}
