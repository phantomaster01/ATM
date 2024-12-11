
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Transacciones")]
public class Transacciones
{
    [Key]
    public int ID_Transaccion { get; set; }
    public int ID_Cliente { get; set; }
    public string Tipo_Transaccion { get; set; }
    public decimal Monto { get; set; }
    public DateTime FechaHora { get; set; }

    [ForeignKey("ID_Clientes")]
    public Clientes? Cliente { get; set; }
}
