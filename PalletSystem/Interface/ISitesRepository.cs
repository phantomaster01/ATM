public interface ISitesRepository
{
    Task<List<Sites>> GetAll();
    Task<Sites> GetById(int id);
    Task<Sites> Create(Sites sites);
    Task<Sites> Update(Sites sites);
    Task<int> Delete(Sites sites);
}