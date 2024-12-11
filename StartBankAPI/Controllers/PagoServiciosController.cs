using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StartBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagoServiciosController : ControllerBase
    {
        public readonly IPagoServiciosRepository _repository;
        public PagoServiciosController(IPagoServiciosRepository repository)
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
        [HttpGet("buscar/{servicio}")]
        public async Task<IActionResult> getTrjeta(int servicio)
        {
            var items = await _repository.GetAll();
            return Ok(items.Where(x => x.ID_PagoServicio == servicio).FirstOrDefault());
        }
        [HttpPost]
        public async Task<IActionResult> setNew([FromBody] PagosServicios tipo)
        {
            return Ok(await _repository.Create(tipo));
        }
        [HttpPut("miruta")]
        public async Task<IActionResult> setUpdate([FromBody] PagosServicios tipo)
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
