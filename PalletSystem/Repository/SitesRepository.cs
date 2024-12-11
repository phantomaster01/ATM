using Microsoft.EntityFrameworkCore;
using PalletSystem.Entitys;

namespace PalletSystem.Repository
{
    public class SitesRepository : ISitesRepository
    {
        public readonly ApplicationDBcontext _dbContext;
        public SitesRepository(ApplicationDBcontext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Sites> Create(Sites sites)
        {
            _dbContext.sites.Add(sites);
            _dbContext.SaveChanges();
            return sites;
        }

        public async Task<int> Delete(Sites sites)
        {
            _dbContext.sites.Remove(sites);
            return _dbContext.SaveChanges();
        }

        public async Task<List<Sites>> GetAll()
        {
            return _dbContext.sites.ToList();
        }

        public async Task<Sites> GetById(int id)
        {
            return _dbContext.sites.Where(x => x.id == id).FirstOrDefault();
        }

        public async Task<Sites> Update(Sites sites)
        {
            _dbContext.Entry(sites).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return sites;
        }
    }
}
