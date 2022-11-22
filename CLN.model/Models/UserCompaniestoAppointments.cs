using CLN.model.APIModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public  class UserCompaniestoAppointments
    {
        public int Id { get; set; }
        public string CompanyProfileId { get; set; }
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
       // public string NumberId { get; set; }
        public string CompanyIdentifier { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string IsOwner { get; set; }
        public List<IndustryDto> Industries { get; set; }
    }
}
