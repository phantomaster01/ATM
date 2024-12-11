public interface ILinesRepository
{
    Task<List<Lines>> GetAll();
    Task<Lines> GetById(int id);
    Task<Lines> Create(Lines lines);
    Task<Lines> Update(Lines lines);
    Task<int> Delete(Lines lines);
}