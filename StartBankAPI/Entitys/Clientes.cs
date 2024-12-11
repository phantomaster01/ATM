using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

[Table("Clientes")]
public class Clientes
{
    [Key]
    public int ID_Cliente { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Direccion { get; set; }
    public string Ciudad {  get; set; }
    public string Telefono { get; set; }
    public string Email { get; set; }

}
