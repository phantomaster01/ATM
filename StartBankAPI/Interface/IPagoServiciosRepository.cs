using System.Runtime.InteropServices;
public interface IPagoServiciosRepository
{
    Task<List<PagosServicios>> GetAll();
    Task<PagosServicios> GetById(int id);
    Task<PagosServicios> Create(PagosServicios servicios);
    Task<PagosServicios> Update(PagosServicios servicios);
    Task<int> Delete(PagosServicios servicios);
}