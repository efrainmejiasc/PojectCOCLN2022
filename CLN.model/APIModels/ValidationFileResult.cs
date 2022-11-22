using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class ValidationFileResult
    {
        public int RecordsNumber { get; set; }
        public int SucceedRecordsNumber { get; set; }
        public int FailedRecordsNumber { get; set; }
        public string Identifier { get; set; }

        public ValidationFileResult() {
            RecordsNumber = 0;
            SucceedRecordsNumber = 0;
            FailedRecordsNumber = 0;
        }
    }
}
