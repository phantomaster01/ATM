using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace StartBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransaccionesController : ControllerBase
    {
        public readonly ITransaccionesRepository _repository;
        public TransaccionesController(ITransaccionesRepository controller)
        {
            _repository = controller;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var item = await _repository.GetAll();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> setNew([FromBody] Transacciones transacciones) 
        {
            return Ok(await _repository.Create(transacciones));
        }
        [HttpPut("miruta")]
        public async Task<IActionResult> setUpdate([FromBody] Transacciones tipoClientes)
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
