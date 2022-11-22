using CLN.model.Models;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IQuizAnswersService
    {
        Task<IResponse> GetQuizAnswers(int id);
        Task<IResponse> CreateQuizAnswers(QuizAnswersDto x, int idUser);
    }
}
