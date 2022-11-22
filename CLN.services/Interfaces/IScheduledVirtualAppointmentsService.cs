using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IScheduledVirtualAppointmentsService
    {
        Task<IResponse> GetReasonVirtualAppointments();
        Task<IResponse> GetApplicationVirtualAppointments();
        Task<IResponse> GetReasonVirtualAppointmentsCancel();
        Task<IResponse> GetReasonVirtualAppointmentsRejection();
        Task<IResponse> UpdateScheduledVirtualAppointmentsDone();
        Task<IResponse> GetScheduledVirtualAppointmentsCompanyEspecificId(int id);
        Task<IResponse> GetScheduledVirtualAppointmentsCompany(string nit, string type);
        Task<IResponse> CreateScheduledVirtualAppointments(ScheduledVirtualAppointments x, int idUser);
        Task<IResponse> UpdateScheduledVirtualAppointments(ScheduledVirtualAppointments x, int idUser);
        Task<IResponse> UpdateSheduledVirtualAppointmentsManagement(ScheduledVirtualAppointments x, int idUser);
        Task<IResponse> UpdateSheduledVirtualAppointmentsManagementTime(ScheduledVirtualAppointments x, int idUser);
    }
}
