using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class CompanyProfileSimple
    {
        public int Id { get; set; }
        public int? CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? NumberId { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? IndustryMainSector { get; set; }
        public bool? IsOwner { get; set; }
        public int? IdUser { get; set; }
        public bool? MicroBusiness { get; set; }
        public string? IdType { get; set; }
        public string? CommercialInformation { get; set; }
    }
}
