using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class ProcessResult
    {
        public string ServiceUrl { get; set; }
        public string ServiceResult { get; set; }
        public string Result { get; set; }
        public string ProcessError { get; set; }
    }
}
