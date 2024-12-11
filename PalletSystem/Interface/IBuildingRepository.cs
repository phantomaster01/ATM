public interface IBuildingRepository
{
    Task<List<Building>> GetAll();
    Task<Building> GetById(int id);
    Task<Building> Create(Building building);
    Task<Building> Update(Building building);
    Task<int> Delete(Building building);
}
