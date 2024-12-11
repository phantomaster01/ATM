using JabilCore.Base.Model;
using System.ComponentModel.DataAnnotations;

namespace PalletSystem.Model
{
    public class Sites : Entity<int>
    {
        public bool Enabled { get; set; } = true;

        [StringLength(32)]
        public string UpdatedBy { get; set; }

        public string Name { get; set; }
        public string Region { get; set; }
    }
}
