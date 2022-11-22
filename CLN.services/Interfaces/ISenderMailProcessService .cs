using System.Threading;
using System.Threading.Tasks;
using CLN.model.APIModels;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;

namespace CLN.services.Interfaces
{
    public interface ISenderMailProcessService
    {
        public Task<string> SenderMailProcessOfferrsAsync();
        public Task<string> SenderAlertsAsync();
        public Task<object> GetInfoMailSended(string email);
        Task<IResponse> SubmitNewCLNContentsAsync(CancellationToken cancelationToken);
        Task<bool> SenderAppointnmentsVirtualNotify(ScheduledVirtualAppointmentsNotify model);
    }
}
