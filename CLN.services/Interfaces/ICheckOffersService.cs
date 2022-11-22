using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface ICheckOffersService
    {
        public Task<string> GetHiringProcessesSecopOne(string pUrl, string pQuery);
        public Task<string> GetHiringProcessesSecopTwo(string pUrl, string pQuery);
    }
}
