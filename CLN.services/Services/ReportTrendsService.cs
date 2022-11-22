using CLN.model.APIModels;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class ReportTrendsService : IReportTrendsService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        public ReportTrendsService(CLNContext context, ICommonService commonService)
        {
            this._context = context;
            this._commonService = commonService;
        }

        // 1 lista  2 objeto
        public async Task<IResponse> GetReportTrendsUrls()
        {
            var result = (List<GTrendsDto>)await _commonService.ExcuteSqlStoredProcedure<GTrendsDto>("GetReportTrendsUrls", null, 1);

            return new Response<List<GTrendsDto>>(result, null);
        }
    }
}
