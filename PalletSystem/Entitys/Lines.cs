using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Lines")]
public class Lines
{
    [Key]
    public int id { get; set; }
    public string line { get; set; }
    public int Building {  get; set; }
    public int Site { get; set; }
    public int Destination { get; set; }
    public int User { get; set; }
    public DateTime LastUpdate { get; set; }
    public bool Active { get; set; }


}
