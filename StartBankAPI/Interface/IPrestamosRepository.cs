public interface IPrestamosRepository
{
    Task<List<Prestamos>> GetAll();
    Task<Prestamos> GetById(int id);
    Task<Prestamos> Create(Prestamos prestamos);
    Task<Prestamos> Update(Prestamos prestamos);
    Task<int> Delete(Prestamos prestamos);
}