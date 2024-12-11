using Microsoft.EntityFrameworkCore;

namespace PalletSystem.Entitys
{
    public class ApplicationDBcontext : DbContext
    {
        public DbSet<Sites> sites {  get; set; }
        public DbSet<Lines> lines { get; set; }
        public DbSet<Building> buildings { get; set; }
        public ApplicationDBcontext(DbContextOptions<ApplicationDBcontext>options)  :base(options) { }
    }
}

using Microsoft.EntityFrameworkCore;
using PalletSystem.Model;

namespace PalletSystem.DataAccess
{
    public partial class DefaultContext : DbContext
    {
        public DefaultContext()
        {
        }

        public DefaultContext(DbContextOptions<DefaultContext> options)
            : base(options)
        {
        }

        public DbSet<Sites> Sites { get; set; }
    }
}
