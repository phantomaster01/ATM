using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StartBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentaController : ControllerBase
    {
        public readonly ICuentaRepository _repository;
        public CuentaController(ICuentaRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {
            var item = await _repository.GetAll();
            return Ok(item);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> getById(int id)
        {
            var item = await _repository.GetById(id);
            return Ok(item);
        }
        [HttpGet("buscar/{tarjeta}")]
        public async Task<IActionResult> getTrjeta(string tarjeta)
        {
            var items = await _repository.GetAll();
            return Ok(items.Where(x => x.Numero_Tarjeta == tarjeta).FirstOrDefault());
        }
        [HttpPost] 
        public async Task<IActionResult> setNew([FromBody] Cuentas tipo)
        {
            return Ok(await _repository.Create(tipo));
        }
        [HttpPut]
        public async Task<IActionResult> setUpdate([FromBody] Cuentas tipo)
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
