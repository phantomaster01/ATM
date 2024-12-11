using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PalletSystem.Entitys;

namespace PalletSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinesController : ControllerBase
    {
        public readonly ILinesRepository _repository;
        public  LinesController (ILinesRepository dbcontext)
        {
            _repository = dbcontext;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {
            var items = await _repository.GetAll();
            return Ok(items);
        }
        [HttpPost]
        public async Task<IActionResult> setNew([FromBody] Lines tipo)
        {
            return Ok(await _repository.Create(tipo));
        }

        [HttpPut("miruta")]
        public async Task<IActionResult> setUpdate([FromBody] Lines tipo)
        {
            try
            {
                return Ok(new { status = true, item = await _repository.Update(tipo) });
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
