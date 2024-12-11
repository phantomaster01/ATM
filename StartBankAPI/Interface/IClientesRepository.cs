public interface IClientesRepository
{
    Task<List<Clientes>> GetAll();
    Task<Clientes> GetById(int id);
    Task<Clientes> Create(Clientes tipoClientes);
    Task<Clientes> Update(Clientes tipoClientes);
    Task<int> Delete(Clientes tipoClientes);
}