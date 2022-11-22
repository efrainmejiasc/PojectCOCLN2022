using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
   public class PatagonianCompanyInCommunity
    {
        public string CommunityName { get; set; }

        public List<CompanyProperty> CompanyProperty { get; set; }
    }

    public class CompanyProperty
    {
        public string Company_Name { get; set; }

        public string Company_Id { get; set; }
    }
}
