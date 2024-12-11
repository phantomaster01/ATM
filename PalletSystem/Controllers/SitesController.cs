using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PalletSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SitesController : ControllerBase
    {
        public readonly ISitesRepository _repository;
        public SitesController(ISitesRepository repository) 
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {
            var items = await _repository.GetAll();
            return Ok(items);
        }
        [HttpPost]
        public async Task<IActionResult> setNew([FromBody] Sites tipo)
        {
            return Ok(await _repository.Create(tipo));
        }

        [HttpPut("miruta")]
        public async Task<IActionResult> setUpdate([FromBody] Sites tipo)
        {
            try
            {
                return Ok(new { statuc = true, item = await _repository.Update(tipo) });
            }
            catch (Exception ex)
            {
                return Ok(new { status = false, message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> setUpdate(int id)
        {
            var item = await _repository.GetById(id);
            return Ok(await _repository.Delete(item));
        }
    }
}
