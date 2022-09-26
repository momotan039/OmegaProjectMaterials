using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.IO;
using System.Linq;

namespace OmegaProject.services
{
   
    public partial class MyTools
    {
        public static void SaveFileOnServerStorage(string[] paths, IFormFile[] files, bool isEdit = false)
        {
            int index = 0;
            if (!isEdit)
                foreach (var file in files)
                {

                    using (var fs = new FileStream(paths[index++], FileMode.Create))
                    {
                        if (file != null)
                        {
                            file.CopyTo(fs);
                        }
                    }
                }

            else
            {
                foreach (var file in files)
                {
                    var _file = paths.FirstOrDefault(f => f.Contains(file.FileName));
                    if (_file == null)
                        continue;
                    using (var fs = new FileStream(_file, FileMode.Create))
                    {

                        if (file != null)
                        {
                            file.CopyTo(fs);
                        }
                    }
                }
            }


        }

        public static string CustomizeNameFile(string mainRoot, string file)
        {

            if (!System.IO.File.Exists(Path.Combine(mainRoot, file)))
                return Path.Combine(mainRoot, file);
            string ext = Path.GetExtension(file);
            int i = 1;
            while (true)
            {
                file = Path.GetFileNameWithoutExtension(file);//f.text
                if (i == 1)
                    file += "_1";
                else
                    file = file.Replace($"_{i - 1}", $"_{i}");
                file += ext;
                if (!System.IO.File.Exists(Path.Combine(mainRoot, file)))
                    return Path.Combine(mainRoot, file);
                i++;
            }
        }
    }
}
