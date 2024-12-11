using System.Transactions;

public interface ITransaccionesRepository
{
    Task<List<Transacciones>> GetAll();
    Task<Transacciones> GetById(int id);
    Task<Transacciones> Create(Transacciones transaccion);
    Task<Transacciones> Update(Transacciones transaccion);
    Task<int> Delete(Transacciones transaccion);
}
