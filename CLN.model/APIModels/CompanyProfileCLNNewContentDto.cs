using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class CompanyProfileCLNNewContentDto
    {
        public int? CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public List<NotificationTypeDto> NotificationTypes { get; set; }
        public List<IndustryDto> Industries { get; set; }
    }
}
