using StartBankAPI.Entitys;
using Microsoft.EntityFrameworkCore;


    public class CuentaRepository : ICuentaRepository
    {
        private readonly ApplicationDBcontext _dbContext;
        public CuentaRepository(ApplicationDBcontext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Cuentas> Create(Cuentas tipoCuenta)
        {
            _dbContext.cuentas.Add(tipoCuenta);
            _dbContext.SaveChanges();
            return tipoCuenta;  
        }

        public async Task<int> Delete(Cuentas TipoCuenta)
        {
            _dbContext.cuentas.Remove(TipoCuenta);
            return _dbContext.SaveChanges();
        }

        public async Task<List<Cuentas>> GetAll()
        {
            return _dbContext.cuentas.Include(x=>x.Cliente).ToList();
        }

        public async Task<Cuentas> GetById(int id)
        {
           return _dbContext.cuentas.Where(x => x.ID_Cliente == id).Include(x => x.Cliente).FirstOrDefault();
        }

        public async Task<Cuentas> Update(Cuentas TipoCuenta)
        {
            _dbContext.Entry(TipoCuenta).State = EntityState.Modified;
            _dbContext.SaveChanges();
             return TipoCuenta;
        }
    }
