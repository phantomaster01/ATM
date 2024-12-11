using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;


[Table("Cuentas")]
public class Cuentas
{
    [Key]
    public int ID_Cuenta { get; set; }
    public string Numero_Cuenta { get; set; }
    public string Numero_Tarjeta { get; set; }
    public string NIP {  get; set; }
    public string Numero_Transferencia { get; set; }
    public string Tipo_Cuenta { get; set; }
    public decimal saldo { get; set; }
    public int ID_Cliente { get; set; }
    [ForeignKey("ID_Cliente")]
    public Clientes? Cliente {  get; set; } 
}