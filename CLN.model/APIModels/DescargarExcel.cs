using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class DescargarExcel
    {
        public byte[] Archivo { get; set; }
        public string NombreArchivo { get; set; }
    }
}
