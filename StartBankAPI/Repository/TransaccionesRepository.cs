using Microsoft.EntityFrameworkCore;
using StartBankAPI.Entitys;

public class TransaccionesRepository : ITransaccionesRepository
{
    public readonly ApplicationDBcontext _dbContext;
    public TransaccionesRepository(ApplicationDBcontext dBcontext)
    {
        _dbContext = dBcontext;
    }

    public async Task<Transacciones> Create(Transacciones transaccion)
    {
        _dbContext.transaccion.Add(transaccion);
        _dbContext.SaveChanges();
        return transaccion;
    }

    public async Task<int> Delete(Transacciones transaccion)
    {
        _dbContext.Remove(transaccion);
        return _dbContext.SaveChanges();
    }

    public async Task<List<Transacciones>> GetAll()
    {
        return _dbContext.transaccion.Include( x => x.Cliente).ToList();
    }

    public async Task<Transacciones> GetById(int id)
    {
        return _dbContext.transaccion.Where(x => x.ID_Cliente == id).Include(x => x.Cliente).FirstOrDefault();
    }

    public async Task<Transacciones> Update(Transacciones transaccion)
    {
        _dbContext.Entry(transaccion).State = EntityState.Modified;
        _dbContext.SaveChanges();
        return transaccion;
    }
}
