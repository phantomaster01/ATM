
using StartBankAPI.Entitys;
using Microsoft.EntityFrameworkCore;

public class ClientesRepository : IClientesRepository
{
    private readonly ApplicationDBcontext _dbContext;
    public ClientesRepository(ApplicationDBcontext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<Clientes>Create(Clientes tipoClientes)
    {
        _dbContext.clientes.Add(tipoClientes);
        _dbContext.SaveChanges();
        return tipoClientes;
    }

    public async Task<int> Delete(Clientes tipoClientes)
    {
        _dbContext.clientes.Remove(tipoClientes);
        return _dbContext.SaveChanges();
    }

    public async Task<List<Clientes>> GetAll()
    {
        return _dbContext.clientes.ToList();
    }

    public async Task<Clientes> GetById(int id)
    {
        return _dbContext.clientes.Where(x => x.ID_Cliente == id).FirstOrDefault();
    }

    public async Task<Clientes> Update(Clientes tipoClientes)
    {
        _dbContext.Entry(tipoClientes).State = EntityState.Modified;
        _dbContext.SaveChanges();
        return tipoClientes;
    }
}