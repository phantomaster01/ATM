using Microsoft.EntityFrameworkCore;

namespace StartBankAPI.Entitys
{
    public class ApplicationDBcontext: DbContext
    {
        public DbSet<Clientes>clientes {  get; set; }
        public DbSet<Cuentas> cuentas { get; set; }
        public DbSet<Transacciones>transaccion {  get; set; }
        public DbSet<PagosServicios>servicios { get; set; }
        public DbSet<Prestamos> prestamo { get; set; }
        
        public ApplicationDBcontext(DbContextOptions<ApplicationDBcontext>options) :base(options) { }
    }
}
