using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [ApiController]
    public class CorreoController : ControllerBase
    {
        [HttpPost]
        [Route("api/sendEmail")]
        public async Task<IActionResult> EnviarCorreo(CorreoModel correo)
        {
            try
            {
                // Configurar el servidor SMTP
                var smtpClient = new SmtpClient("mail.gownetwork.com.mx")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("amado@gownetwork.com.mx", "Xorashk1.$"),
                    EnableSsl = true,
                };

                // Crear el mensaje de correo electrónico
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("amado@gownetwork.com.mx"),
                    Subject = correo.Asunto,
                    IsBodyHtml = true,
                    Body = correo.Mensaje
                };
                mailMessage.To.Add(new MailAddress(correo.Destinatario));

                // Enviar el correo electrónico
                await smtpClient.SendMailAsync(mailMessage);

                return Ok("Correo electrónico enviado correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al enviar el correo electrónico: " + ex.Message);
            }
        }
    }

    public class CorreoModel
    {
        public string Destinatario { get; set; }
        public string Asunto { get; set; }
        public string Mensaje { get; set; }
    }
}

