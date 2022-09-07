using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using MimeKit;
using System;
using System.Security.Cryptography;
using System.Text;

namespace OmegaProject.services
{
    public partial class MyTools
    {
        //wwwroot path
        public static string mainRoot;
        //Files of Teachers path
        public static string mainTeachersRoot;
        //Files of Students path
        public static string mainSubmitedRoot;

        public static string GenerateHashedPassword()
        {
            var x = SHA256.Create().ComputeHash(Encoding.Default.GetBytes("MomoTan Best Programmer"));
            return Convert.ToBase64String(x);
        }

        public  static string CreateHashedPassword(string pass)
        {
            var x = SHA256.Create().ComputeHash(Encoding.Default.GetBytes(pass));
            return Convert.ToBase64String(x);
        }


        public static string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}
