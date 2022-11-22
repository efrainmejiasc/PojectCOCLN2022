using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class IndustryDto
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }

    public class UserCompaniesToManageDto
    {
        public int CompanyProfileId { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyIdentifier { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<IndustryDto> Industries { get; set; }
        public bool IsOwner { get; set; }
    }
}
