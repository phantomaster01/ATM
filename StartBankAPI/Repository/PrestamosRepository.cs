using StartBankAPI.Entitys;
using Microsoft.EntityFrameworkCore;

public class PrestamosRepository : IPrestamosRepository
{
    public readonly ApplicationDBcontext _dbcontext;
    public PrestamosRepository(ApplicationDBcontext dbcontext)
    { _dbcontext = dbcontext; }

    public async Task<Prestamos> Create(Prestamos prestamos)
    {
        _dbcontext.prestamo.Add(prestamos);
        _dbcontext.SaveChanges();
        return prestamos;
    }

    public async Task<int> Delete(Prestamos prestamos)
    {
        _dbcontext.prestamo.Remove(prestamos);
        return _dbcontext.SaveChanges();
    }

    public async Task<List<Prestamos>> GetAll()
    {
        return _dbcontext.prestamo.Include(x => x.Cliente).ToList();
    }

    public async Task<Prestamos> GetById(int id)
    {
        return _dbcontext.prestamo.Where(x => x.ID_Cliente == id).Include(x => x.Cliente).FirstOrDefault();
    }

    public async Task<Prestamos> Update(Prestamos prestamos)
    {
        _dbcontext.Entry(prestamos).State = EntityState.Modified;
        _dbcontext.SaveChanges();
        return prestamos;
    }
}
