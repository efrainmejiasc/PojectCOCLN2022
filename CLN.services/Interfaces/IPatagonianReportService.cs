using CLN.model.APIModels;
using CLN.model.Settings;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public  interface IPatagonianReportService
    {
        Task<IResponse> SetDataDbPatagonianAsync(string clientToken, string urlBase, string userInCourseUrl, string companyInCourseUrl, 
                                                 string communityUrl, string businessOpportunityUrl, string companyInCommunityUrl, string applicationsProductsServicesUrl);

    }
}
