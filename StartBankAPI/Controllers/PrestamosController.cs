using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StartBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamosController : ControllerBase
    {
        public  readonly IPrestamosRepository _repository;
        public PrestamosController(IPrestamosRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
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
        [HttpGet("buscar/{Prestamo}")]
        public async Task<IActionResult> getPrestamo(int Prestamo)
        {
            var items = await _repository.GetAll();
            return Ok(items.Where(x => x.ID_Prestamo == Prestamo).FirstOrDefault());
        }
        [HttpPost]
        public async Task<IActionResult> setNew([FromBody] Prestamos tipo)
        {
            return Ok(await _repository.Create(tipo));
        }
        [HttpPut]
        public async Task<IActionResult> setUpdate([FromBody] Prestamos tipo)
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
        [HttpDelete]
        public async Task<IActionResult> setUpdate(int id)
        {
            var item = await _repository.GetById(id);
            return Ok(await _repository.Delete(item));
        }

    }
}
