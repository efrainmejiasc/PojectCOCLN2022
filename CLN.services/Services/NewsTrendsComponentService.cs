using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public  class NewsTrendsComponentService: INewsTrendsComponentService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;

        public NewsTrendsComponentService(CLNContext context, ICommonService commonService)
        {
            _context = context;
            _commonService = commonService;
        }

        public async Task<object> GetComponents(string all)
        {
            _ = int.TryParse(all, out int a);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@onlyActives", a)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<HomeComponentDto>("GetNewsTrendsComponents", parameterList, 1);
            return result;
        }

        public async Task<object> GetPublishedComponents()
        {
            var result = await _commonService.ExcuteSqlStoredProcedure<HomeComponentDto>("GetPublishedNewsTrendsComponents", null, 1);
            return result;
        }

        public async Task<object> GetComponentDetail(string id)
        {
            _ = int.TryParse(id, out int i);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idNewsTrendsComponent", i)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<HomeComponentDto>("GetNewsTrendsComponentDetail", parameterList, 2);
            return result;
        }

        public async Task<object> DeleteComponent(string id, string idUser)
        {
            _ = int.TryParse(id, out int i);
            _ = int.TryParse(idUser, out int iu);

            Audit auditDeleteComponent = new();

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idNewsTrendsComponet", i),
                new SqlParameter("@idUser", iu)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("DeleteNewsTrendsComponent", parameterList, 2);
            auditDeleteComponent.Date = DateTime.Now;
            auditDeleteComponent.IdAction = 3;
            auditDeleteComponent.IdMessageResponse = 1;
            auditDeleteComponent.IdUser = iu;
            _context.Audits.Add(auditDeleteComponent);
            return result;
        }

        public async Task<object> EditComponents(object entity, string idUser)
        {
            var obj = (List<HomeComponentDto>)entity;
            var jsonObj = JsonConvert.SerializeObject(obj);
            _ = int.TryParse(idUser, out int iu);
            Audit auditEditComponent = new();
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@componentsJson", jsonObj),
                new SqlParameter("@idUser", iu)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<UpdateComponentResponse>("UpdateNewsTrendsComponent", parameterList, 1);
            auditEditComponent.Date = DateTime.Now;
            auditEditComponent.IdAction = 2;
            auditEditComponent.IdMessageResponse = 1;
            auditEditComponent.IdUser = iu;
            _context.Audits.Add(auditEditComponent);
            return result;
        }

        public async Task<object> CreateComponents(object entity, string idUser)
        {
            var obj = (List<HomeComponentDto>)entity;
            var jsonObj = JsonConvert.SerializeObject(obj);
            _ = int.TryParse(idUser, out int iu);
            Audit auditCreateComponent = new();
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@componentsJson", jsonObj),
                new SqlParameter("@idUser", iu)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<CreateComponentResponse>("CreateNewsTrendsComponent", parameterList, 1);
            auditCreateComponent.Date = DateTime.Now;
            auditCreateComponent.IdAction = 1;
            auditCreateComponent.IdMessageResponse = 1;
            auditCreateComponent.IdUser = iu;
            _context.Audits.Add(auditCreateComponent);
            return result;
        }

        public async Task<object> PublishComponents(string idUser, string assetsHomeRute)
        {
            _ = int.TryParse(idUser, out int iu);
            Audit auditPublishComponent = new();
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser", iu)
            };

            var search = (List<object>)await _commonService.ExcuteSqlStoredProcedure<object>("PublishNewsTrendsComponent", parameterList, 1);
            string jsonData = JsonConvert.SerializeObject(search, Formatting.None);
            //write string to file
            await System.IO.File.WriteAllTextAsync(assetsHomeRute, jsonData);
            auditPublishComponent.Date = DateTime.Now;
            auditPublishComponent.IdAction = 4;
            auditPublishComponent.IdMessageResponse = 1;
            auditPublishComponent.IdUser = iu;

            _context.Audits.Add(auditPublishComponent);
            return "OK";
        }
        public async Task<object> SaveMultimediaComponent(IFormFile pFile, string pDirectory)
        {
            Guid guid = Guid.NewGuid();
            object Obj = null;
            string strNameDocument = $"{guid};{pFile.FileName}";
            string fullPath = Path.Combine(pDirectory + "/" + strNameDocument);
            Audit auditSaveFileComponent = new();
            if (!Directory.Exists(pDirectory))
            {
                Directory.CreateDirectory(pDirectory);
            }

            var streamFile = new FileStream(
                                            fullPath,
                                            FileMode.Create
                                            );
            using (streamFile)
            {
                await pFile.CopyToAsync(streamFile);
                Obj = pFile;
            }
            auditSaveFileComponent.Date = DateTime.Now;
            auditSaveFileComponent.IdAction = 5;
            auditSaveFileComponent.IdMessageResponse = 1;
            _context.Audits.Add(auditSaveFileComponent);
            return strNameDocument;

        }
    }
}
