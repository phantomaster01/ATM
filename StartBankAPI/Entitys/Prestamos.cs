using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Prestamos")]
public class Prestamos
{
    [Key]
    public int ID_Prestamo { get; set; }
    public decimal Monto { get; set; }
    public decimal TasaInteres {  get; set; }
    public int PlazoMeses { get; set; }
    public DateTime FechaInicio { get; set; }
    public string Estado { get; set; }
    public int ID_Cliente { get; set; }
    [ForeignKey("ID_Cliente")]
    public Clientes? Cliente { get; set; }

}
