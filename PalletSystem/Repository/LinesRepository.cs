using Microsoft.EntityFrameworkCore;
using PalletSystem.Entitys;

public class LinesRepository : ILinesRepository
{
    public readonly ApplicationDBcontext _dbcontext;
    public LinesRepository(ApplicationDBcontext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task<Lines> Create(Lines lines)
    {
        _dbcontext.lines.Add(lines);
        _dbcontext.SaveChanges();
        return lines;
    }

    public async Task<int> Delete(Lines lines)
    {
        _dbcontext.lines.Remove(lines);
        return _dbcontext.SaveChanges();
    }

    public async Task<List<Lines>> GetAll()
    {
        return _dbcontext.lines.ToList();
    }

    public async Task<Lines> GetById(int id)
    {
        return _dbcontext.lines.Where(x => x.id == id).FirstOrDefault();
    }

    public async Task<Lines> Update(Lines lines)
    {
        _dbcontext.Entry(lines).State = EntityState.Modified;
        _dbcontext.SaveChanges();
        return lines;
    }
}