using System.Runtime.InteropServices;

public interface ICuentaRepository
{
    Task<List<Cuentas>> GetAll();
    Task<Cuentas> GetById(int id);
    Task<Cuentas> Create(Cuentas TipoCuemta);
    Task<int> Delete(Cuentas TipoCuenta);
    Task<Cuentas> Update(Cuentas TipoCuenta);
}