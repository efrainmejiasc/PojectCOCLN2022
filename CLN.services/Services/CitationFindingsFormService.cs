using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace CLN.services.Services
{
    public class CitationFindingsFormService: ICitationFindingsFormService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;

        public CitationFindingsFormService(CLNContext context, ICommonService commonService)
        {
            this._context = context;
            this._commonService = commonService;
        }



        // 1 lista  2 objeto
        public async Task<IResponse> GetCitationFindingsForm(int idUser, int idState)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser",idUser)
            };

            var citationFindingsForm = new List<CitationFindingsForm>();

            if (idState == 1)
            {
                citationFindingsForm = (List<CitationFindingsForm>)await this._commonService.ExcuteSqlStoredProcedure<CitationFindingsForm>("GetCitationFindingsForm", parameterList, 1);
                if(citationFindingsForm.Count == 0)
                {
                    var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateCitationFindingsForm", null, 2);

                    parameterList = new SqlParameter[]
                    {
                     new SqlParameter("@idUser",idUser)
                    };
                    citationFindingsForm = (List<CitationFindingsForm>)await this._commonService.ExcuteSqlStoredProcedure<CitationFindingsForm>("GetCitationFindingsForm", parameterList, 1);
                }
            }
            else if(idState==4)
                citationFindingsForm = (List<CitationFindingsForm>)await this._commonService.ExcuteSqlStoredProcedure<CitationFindingsForm>("GetCitationFindingsFormPublish", parameterList, 1);


            var model = SetCitationFindingsFormDto(citationFindingsForm);

            return new Response<CitationFindingsFormDto>(model, null);
        }

        public async Task<IResponse> UpdateCitationFindingsForm(CitationFindingsFormDto model, int idUser, string type)
        {
            var jsonModel = SetCitationFindingsFormJson(model, type, idUser);
            var itemsJson = JsonConvert.SerializeObject(jsonModel);

            idUser = idUser == 0 ? 1 : idUser;
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@itemsJson", itemsJson),
                new SqlParameter("@idUser", idUser)
            };

            var update = (List<CitationFindingsForm>)await _commonService.ExcuteSqlStoredProcedure<CitationFindingsForm>("UpdateCitationFindingsForm", parameterList, 1);

            var jsonResponse = SetDetailResponseToInsert(model, update);
            itemsJson = JsonConvert.SerializeObject(jsonResponse);


            parameterList = new SqlParameter[]
            {
                  new SqlParameter("@itemsJson", itemsJson),
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateCitationFindingsFormResponse", parameterList, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<IResponse> UpdateCitationFindingsFormPublish(CitationFindingsFormDto model, int idUser, string type)
        {
            var jsonModel = SetCitationFindingsFormJson(model, type, idUser);
            var itemsJson = JsonConvert.SerializeObject(jsonModel);
            idUser = idUser == 0 ? 1 : idUser;

            SqlParameter[] parameterList = new SqlParameter[]
            {
                  new SqlParameter("@itemsJson", itemsJson),
                  new SqlParameter("@idUser", idUser)
            };

            var update = (List<CitationFindingsForm>)await _commonService.ExcuteSqlStoredProcedure<CitationFindingsForm>("UpdateCitationFindingsFormPublish", parameterList, 1);

            var jsonResponse = SetDetailResponseToInsert(model, update);
            itemsJson = JsonConvert.SerializeObject(jsonResponse);

            parameterList = new SqlParameter[]
            {
                  new SqlParameter("@itemsJson", itemsJson)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateCitationFindingsFormResponsePublish", parameterList, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        #region PRIVATE_GET

        private CitationFindingsFormDto SetCitationFindingsFormDto(List<CitationFindingsForm> l)
        {
            var single = new CitationFindingsFormDto()
            {
                Id = l.Select(x => x.Id).FirstOrDefault(),
                IdUser = l.Select(x => x.IdUser).FirstOrDefault(),
                FirstName = l.Select(x => x.FirstName).FirstOrDefault(),
                FirstSurName = l.Select(x => x.FirstSurName).FirstOrDefault(),
                Email = l.Select(x => x.Email).FirstOrDefault(),
                IdState = l.Select(x => x.IdState).FirstOrDefault(),
                PropertysCitationFindingsForm = SetPropertysCitationFindingsForm(l)
            };

            return single;
        }
        private List<PropertysCitationFindingsForm> SetPropertysCitationFindingsForm(List<CitationFindingsForm> l)
        {
            var model = new List<PropertysCitationFindingsForm>();
            var lstAsk = l.Select(x => x.Ask).Distinct().ToList();

            foreach (var textAsk in lstAsk)
            {
                var resType = l.Where(x => x.Ask == textAsk).Select(x => x.ResponseType).FirstOrDefault();

                var single = new PropertysCitationFindingsForm()
                {
                    Id = l.Where(x => x.Ask == textAsk).Select(x => x.IdDetail).FirstOrDefault(),
                    IsToShow = l.Where(x => x.Ask == textAsk).Select(x => x.IsToShow).FirstOrDefault(),
                    Name = textAsk,
                    IdState = l.Where(x => x.Ask == textAsk).Select(x => x.IdStateDetail).FirstOrDefault(),
                    IsRequiredDiligence = l.Where(x => x.Ask == textAsk).Select(x => x.Mandatory).FirstOrDefault(),
                    QuestionType = new QuestionType()
                    {
                        Id = !resType ? 1 : 2,
                        Name = !resType ? "Selección Única" : "Selección Múltiple",
                        Position = l.Where(x => x.Ask == textAsk).Select(x => x.PositionDetail).FirstOrDefault(),
                    },
                    Condition = new Condition()
                    {
                        IsConditionAnswer = l.Where(x => x.Ask == textAsk).Select(x => x.IsConditionResponse).FirstOrDefault(),
                        IsConditionQuestion = l.Where(x => x.Ask == textAsk).Select(x => x.IsConditionAsk).FirstOrDefault(),
                        IdConditionAnswer = l.Where(x => x.Ask == textAsk).Select(x => x.IdConditionResponse).FirstOrDefault(),
                        IdConditionQuestion = l.Where(x => x.Ask == textAsk).Select(x => x.IdConditionAsk).FirstOrDefault()
                    },
                    AnswersOptions = SetAnswersOptions(l.Where(x => x.Ask == textAsk).ToList())
                };

                model.Add(single);

            }

            return model;
        }
        private List<AnswersOption> SetAnswersOptions(List<CitationFindingsForm> l)
        {
            var model = new List<AnswersOption>();

            foreach (var y in l)
            {
                var single = new AnswersOption()
                {
                    Id = y.PositionResponse, //y.IdResponse,
                    Name = y.Response,
                    Position = y.PositionResponse
                };

                model.Add(single);
            }

            return model;
        }
        #endregion

        #region PRIVATE_CREATE

        private CitationFindingsFormJson SetCitationFindingsFormJson(CitationFindingsFormDto l,string type, int idUser)
        {
            var model = new CitationFindingsFormJson();
            model.Id = type == "POST" ? 0 : l.Id;
            model.IdUser = l.IdUser;
            model.IdState = l.IdState;
            model.DateCreate = DateTime.Now;
            model.IdUserCreate = idUser;
            model.DateUpdate = DateTime.Now;
            model.IdUserUpdate = idUser;
            model.CitationFindingsFormDetail = SetCitationFindingsFormDetail(l);
            model.CitationFindingsFormDetailResponse = SetCitationFindingsFormDetailResponse(l);

            return model;
        }
        private List<CitationFindingsFormDetail> SetCitationFindingsFormDetail(CitationFindingsFormDto l)
        {
            var lst = new List<CitationFindingsFormDetail>();
            
            foreach (var y in l.PropertysCitationFindingsForm)
            {
                var single = new CitationFindingsFormDetail()
                {
                    IdDetail = 0,
                    IdCitationFindingsForm = 0,
                    IdStateDetail = y.IdState,
                    Ask = y.Name,
                    ResponseType = y.QuestionType.Id == 1 ? false : true,
                    IsToShow = y.IsToShow,
                    Mandatory = y.IsRequiredDiligence,
                    IsConditionAsk = y.Condition.IsConditionQuestion,
                    IdConditionAsk  = y.Condition.IdConditionQuestion,
                    IsConditionResponse = y.Condition.IsConditionAnswer,
                    IdConditionResponse = y.Condition.IdConditionAnswer,
                    PositionDetail = y.QuestionType.Position
            };

                lst.Add(single);
            }

            return lst;
        }
        private List<CitationFindingsFormDetailResponse> SetCitationFindingsFormDetailResponse(CitationFindingsFormDto l)
        {
            var lst = new List<CitationFindingsFormDetailResponse>();

            foreach (var y in l.PropertysCitationFindingsForm)
            {
                foreach(var g in y.AnswersOptions)
                {
                    var single = new CitationFindingsFormDetailResponse()
                    {
                        IdResponse = 0,
                        IdCitationFindingsFormDetail=0,
                        Response= g.Name,
                        PositionResponse = g.Position,
                        QuestionNumber = g.QuestionNumber
                    };

                    lst.Add(single);
                }
            }

            return lst;
        }
        private List<CitationFindingsFormDetailResponse> SetDetailResponseToInsert(CitationFindingsFormDto l, List<CitationFindingsForm> r)
        {
            var lst = new List<CitationFindingsFormDetailResponse>();
            var index = r.Select(x => x.Id).ToList();
            var questions = l.PropertysCitationFindingsForm.Select(x => x.AnswersOptions).ToList();

            int n = 0;
            foreach (var i in index)
            {
                var responses = questions[n].ToList();

                foreach (var resp in responses)
                {
                    var single = new CitationFindingsFormDetailResponse()
                    {
                        IdCitationFindingsFormDetail = i,
                        Response = resp.Name,
                        PositionResponse = resp.Position
                    };
                    lst.Add(single);
                }
                n++;
            };

            return lst;
        }

        #endregion


    }
}
