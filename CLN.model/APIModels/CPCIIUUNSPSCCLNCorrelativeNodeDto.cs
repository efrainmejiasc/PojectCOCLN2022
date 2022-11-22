using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class CPCIIUUNSPSCCLNCorrelativeSectorNodeDto
    {
        public int SectorCode { get; set; }
        public string SectorName { get; set; }
        public List<CPCIIUUNSPSCCLNCorrelativeProcudtNodeDto> CorrelativeProducts { get; set;}
    }
    public class CPCIIUUNSPSCCLNCorrelativeProcudtNodeDto
    {
        public int ProductCode { get; set; }
        public string ProductName { get; set; }
    }
}
