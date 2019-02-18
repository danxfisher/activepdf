using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;

namespace ActivePDFCodeExercise.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UploadController : ControllerBase
  {
		[HttpPost, DisableRequestSizeLimit]
		public async Task<IActionResult> Upload()
		{
			try
			{
				var file = Request.Form.Files[0];
				var folderName = Path.Combine("Resources", "Uploads");
				var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

				if (file.Length > 0)
				{
					var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
					var fullPath = Path.Combine(pathToSave, fileName);
					var serverPath = Path.Combine(folderName, fileName);
					var webPath = serverPath.Replace("\\", "/");

					using (var stream = new FileStream(fullPath, FileMode.Create))
					{
						file.CopyTo(stream);
					}

					// start ActivePDF conversion
					string aPDFwebPath = await ConvertImage(fullPath, serverPath);

					// return web paths of uploaded and converted items
					return Ok(new { webPath, aPDFwebPath });
				}
				else
				{
					return BadRequest();
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, "Internal server error: " + ex);
			}
		}

		public Task<String> ConvertImage(string fullPath, string serverPath)
		{
			APToolkitNET.Toolkit oTK = new APToolkitNET.Toolkit();

			var aPDFfolderName = Path.Combine("Resources", "PDFs");
			var aPDFpathToSave = Path.Combine(Directory.GetCurrentDirectory(), aPDFfolderName);
			var aPDFfilename = Path.GetFileNameWithoutExtension(serverPath);

			int intImageToPDF = oTK.ImageToPDF(fullPath, aPDFpathToSave + '\\' + aPDFfilename + ".pdf");

			var aPDFserverPath = Path.Combine(aPDFfolderName, aPDFfilename);
			String aPDFwebPath = aPDFserverPath.Replace("\\", "/") + ".pdf";

			return Task.FromResult(aPDFwebPath);
		}
	}
}