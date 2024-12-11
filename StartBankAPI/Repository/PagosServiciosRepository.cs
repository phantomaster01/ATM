
using Microsoft.EntityFrameworkCore;
using StartBankAPI.Entitys;

public class PagosServiciosRepository : IPagoServiciosRepository
{
    public readonly ApplicationDBcontext _dbContext;
    public PagosServiciosRepository(ApplicationDBcontext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagosServicios> Create(PagosServicios PServicios)
    {
        _dbContext.servicios.Add(PServicios);
        _dbContext.SaveChanges();
        return new PagosServicios();
        
    }

    public async Task<int> Delete(PagosServicios PServicioas)
    {
        _dbContext.servicios.Remove(PServicioas);
        return _dbContext.SaveChanges();
    }

    public async Task<List<PagosServicios>> GetAll()
    {
        return _dbContext.servicios.Include(x => x.Cliente).ToList();
    }

    public async Task<PagosServicios> GetById(int id)
    {
        return _dbContext.servicios.Where(x => x.ID_Cliente == id).Include(x => x.Cliente).FirstOrDefault();
    }

    public async Task<PagosServicios> Update(PagosServicios PServicios)
    {
        _dbContext.Entry(PServicios).State = EntityState.Modified;
        _dbContext.SaveChanges();
        return PServicios;
    }
}