using CLN.model.Models;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IVirtualAppointmentsService
    {
        Task<IResponse> GetAvailableHoursCompany(string nit,int idUser);
        AvailableHoursCompanyDto SetAvailableHoursCompanyDto(List<CompanyProfileSimple> lst);
        Task<IResponse> UpdateAvailableHoursCompany(AvailableHoursCompanyDto model,int idUser);
        Task<IResponse> UpdateAvailableHoursCompanyEspecific(AvailableHoursCompanyEspecificDto model, int idUser);
        Task<IResponse> GetAvailableHoursCompanyEspecificBetweenDate(string nit, DateTime startDate, DateTime endDate);
    }
}
