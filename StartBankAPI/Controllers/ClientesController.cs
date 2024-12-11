using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StartBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        public readonly IClientesRepository _repository;
        public ClientesController(IClientesRepository repository)
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
        public async Task<IActionResult> setNew([FromBody] Clientes tipoClientes)
        {
            return Ok(await _repository.Create(tipoClientes));
        }
        [HttpPut("miruta")]
        public async Task<IActionResult> setUpdate([FromBody] Clientes tipoClientes)
        {
            try
            {
                return Ok(new { statuc = true, item = await _repository.Update(tipoClientes) });
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
