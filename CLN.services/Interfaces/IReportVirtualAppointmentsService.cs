using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IReportVirtualAppointmentsService
    {
        Task<IResponse> GetVirtualAppointmentsReports();
        Task<object> GetVirtualAppointmentsReportExcel(string startDate, string endDate, string sheetName);
    }
}
