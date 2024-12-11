using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

[Table("PagosServicios")]
public class PagosServicios
{
    [Key]
    public int ID_PagoServicio { get; set; }
    public string Servicio { get; set; }
    public decimal Monto { get; set; }
    public DateTime FechaHora { get; set; }
    public int ID_Cliente { get; set; }

    [ForeignKey("ID_Cliente")]
    public Clientes? Cliente { get; set; }

}
