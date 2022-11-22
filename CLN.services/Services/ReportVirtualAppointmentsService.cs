using CLN.model.APIModels;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class ReportVirtualAppointmentsService : IReportVirtualAppointmentsService
    {
        private readonly ICommonService _commonService;
        public ReportVirtualAppointmentsService(ICommonService commonService)
        {
            _commonService = commonService;
        }

        public async Task<IResponse> GetVirtualAppointmentsReports()
        {
            var result = (List<VirtualAppointmentReportDto>)await _commonService.ExcuteSqlStoredProcedure<VirtualAppointmentReportDto>("GetVirtualAppointmentsReports", null, 1);

            return new Response<List<VirtualAppointmentReportDto>>(result, null);
        }
        public async Task<object> GetVirtualAppointmentsReportExcel(string startDate, string endDate, string sheetName)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@startDate", startDate),
                new SqlParameter("@endDate", endDate)
            };

            var records = await _commonService.ExcuteSqlStoredProcedure("GetVirtualAppointmentsReportExcel", parameterList);
            var byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(records, sheetName, false);

            return byteFile;
        }
    }
}
