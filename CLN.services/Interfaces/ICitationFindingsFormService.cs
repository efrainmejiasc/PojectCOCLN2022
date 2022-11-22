using CLN.model.Models;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface ICitationFindingsFormService
    {
        Task<IResponse> GetCitationFindingsForm(int idUser,int idState);
        Task<IResponse> UpdateCitationFindingsForm(CitationFindingsFormDto model, int idUser, string type);
        Task<IResponse> UpdateCitationFindingsFormPublish(CitationFindingsFormDto model, int idUser, string type);
    }
}
