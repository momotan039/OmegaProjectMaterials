using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OmegaProject.DTO;
using OmegaProject.services;
using System.Dynamic;
using System.Linq;

namespace OmegaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly MyDbContext db;
        private readonly JwtService jwt;

        public IServer Server { get; }

        public AccountController(MyDbContext db,JwtService jwt,IServer server)
        {
            this.db = db;
            this.jwt = jwt;
            Server = server;
        }
        [HttpPost]
        [Route("ResetPassword")]
        public IActionResult ResetPassword(UserLogInDTO model)
        {
            model.Email = jwt.GetTokenClaims();
            var user=db.Users.FirstOrDefault(q=>q.Email==model.Email);
            if(user==null)
                return NotFound("User Not Exist!!");
            user.Password = MyTools.CreateHashedPassword(model.Password);
            db.SaveChanges();
            return Ok("Password Changed Successfully!");
        }

        [HttpPost]
        [Route("ForgetPassword")]
        public IActionResult ForgetPassword([FromBody]UserLogInDTO u)
        {

            var user = db.Users.FirstOrDefault(q => q.Email == u.Email);

            if (user == null)
                return NotFound("User Not Exist!!");

            string token=jwt.GenerateToken(u.Email, false,new System.TimeSpan(0,5,0));

            token = token.Replace("Bearer ", "");

            bool success = MyTools.SendResetPassMail(token, u.Email);

            if(!success)
            return BadRequest("Occured Error While Sending Link to Mail!!");

            return Ok("Link Sended to Mail Successfully!");
        }

        [Authorize]
        [HttpPut]
        [Route("EditImageProfile")]
        public IActionResult EditImageProfile(IFormFile image)
        {

            if (image==null)
                return BadRequest("Image is null");

            int id = int.Parse(jwt.GetTokenClaims());
            User u = db.Users.FirstOrDefault(f => f.Id == id);

            if (u == null)
                return NotFound("Not Found User");

            u.ImageProfile = u.ImageProfile = $"/Images/Users/{id}{System.IO.Path.GetExtension(image.FileName)}";

            

            var files = new IFormFile[] { image };
            var paths =new string[] {
                System.IO.Path.Combine(MyTools.mainImagesRoot,"Users",id+
                System.IO.Path.GetExtension(image.FileName)) 
            };
            try
            {
                MyTools.SaveFileOnServerStorage(paths,files);
            }
            catch
            {
                return BadRequest("Error While Save Image");
            }
            db.SaveChanges();
            return Ok("Image Edited Successfully");
        }
        
        [Authorize]
        [HttpPut]
        [Route("EditImageProfileGroup")]
        public IActionResult EditUser(IFormFile image)
        {

            if (image==null)
                return BadRequest("Image is null");

            int id = int.Parse(HttpContext.Request.Form["idGroup"]);

            Group g = db.Groups.FirstOrDefault(f => f.Id == id);

            if (g == null)
                return NotFound("Not Found Group");

            g.ImageProfile = g.ImageProfile = $"/Images/Groups/{id}{System.IO.Path.GetExtension(image.FileName)}";

            

            var files = new IFormFile[] { image };
            var paths =new string[] {
                System.IO.Path.Combine(MyTools.mainImagesRoot,"Groups",id+
                System.IO.Path.GetExtension(image.FileName)) 
            };
            try
            {
                MyTools.SaveFileOnServerStorage(paths,files);
            }
            catch
            {
                return BadRequest("Error While Save Image");
            }
            db.SaveChanges();
            return Ok("Image Edited Successfully");
        }

    }
}
