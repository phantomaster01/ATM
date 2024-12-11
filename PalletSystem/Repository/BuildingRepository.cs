using Microsoft.EntityFrameworkCore;
using PalletSystem.Entitys;

namespace PalletSystem.Repository
{
    public class BuildingRepository : IBuildingRepository
    {
        public readonly ApplicationDBcontext _dbcontext;
        public BuildingRepository(ApplicationDBcontext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<Building> Create(Building building)
        {
            _dbcontext.buildings.Add(building);
            _dbcontext.SaveChanges();
            return building;
        }

        public async Task<int> Delete(Building building)
        {
            _dbcontext.buildings.Remove(building);
            return _dbcontext.SaveChanges();
        }

        public async Task<List<Building>> GetAll()
        {
            return _dbcontext.buildings.ToList();
        }

        public async Task<Building> GetById(int id)
        {
            return _dbcontext.buildings.Where(x => x.id == id).FirstOrDefault();
        }

        public async Task<Building> Update(Building building)
        {
            _dbcontext.Entry(building).State = EntityState.Modified;
            _dbcontext.SaveChanges();
            return building;
        }
    }
}
