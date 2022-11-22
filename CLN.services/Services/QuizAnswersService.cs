using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class QuizAnswersService : IQuizAnswersService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;

        public QuizAnswersService(CLNContext context, ICommonService commonService)
        {
            this._context = context;
            this._commonService = commonService;
        }

        public async Task<IResponse> CreateQuizAnswers(QuizAnswersDto x, int idUser)
        {
            var countAnswers = x.QuizAnswersDetail.Count;
            var itemsJson = JsonConvert.SerializeObject(x);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@itemsJson", itemsJson),
                new SqlParameter("@idUser", idUser),
                new SqlParameter("@countAnswers", countAnswers),
            };
            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateQuizAnswers", parameterList, 2);
         
            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> GetQuizAnswers(int id)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idSheduleVirtualAppointments", id)
            };
            var schema = (List<QuizAnswersModel>)await _commonService.ExcuteSqlStoredProcedure<QuizAnswersModel>("GetQuizAnswers", parameterList, 1);
           
            var quizAnswerDto = SetQuizAnswersDto(schema);
            return new Response<QuizAnswersDto>(quizAnswerDto, null);
        }

        #region PRIVATE

        private QuizAnswersDto SetQuizAnswersDto (List<QuizAnswersModel> lst)
        {
            var model = new QuizAnswersDto()
            {
                Id = lst.Select(x => x.Id).FirstOrDefault(),
                IdSheduledVirtualAppointments = lst.Select(x => x.IdSheduledVirtualAppointments).FirstOrDefault(),
                IdState = lst.Select(x => x.IdState).FirstOrDefault(),
                DateCreate = lst.Select(x => x.DateCreate).FirstOrDefault(),
                IdUserCreate = lst.Select(x => x.IdUserCreate).FirstOrDefault(),
                DateUpdate = lst.Select(x => x.DateUpdate).FirstOrDefault(),
                IdUserUpdate = lst.Select(x => x.IdUserUpdate).FirstOrDefault(),
                QuizAnswersDetail = QuizAnswersDetail(lst)
            };

            return model;
        }

        private List<QuizAnswersDetail> QuizAnswersDetail (List<QuizAnswersModel> lst)
        {
            var model = new List<QuizAnswersDetail>();
            foreach(var y in lst)
            {
                var single = new QuizAnswersDetail()
                {
                    IdDetail= y.IdDetail,
                    IdQuizAnswers =y.IdQuizAnswers,
                    IdAsk =y.IdAsk,
                    Ask =y.Ask ,
                    Response =y.Response,
                    Position =y.Position,
                };

                model.Add(single);
            }

            return model;
        }


        #endregion

    }
}
