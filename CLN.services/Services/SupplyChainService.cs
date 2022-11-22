using CLN.model.APIModels;
using CLN.model.Settings;
using CLN.services.Helpers.Enumerator;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class SupplyChainService : ISupplyChainService
    {
        private readonly ICommonService _commonService;
        private readonly AppSettings _settings;
        private readonly SupplyChainSettings _supplyChainSettings;

        public SupplyChainService(ICommonService commonService, IOptions<AppSettings> settings, IOptions<SupplyChainSettings> supplyChainSettings)
        {
            _commonService = commonService;
            _settings = settings.Value;
            _supplyChainSettings = supplyChainSettings.Value;
        }

        public async Task<IResponse> GetSupplyElements()
        {
            var result = (List<SupplyElementDto>)await _commonService.ExcuteSqlStoredProcedure<SupplyElementDto>("GetSupplyElements", null, 1);

            return new Response<List<SupplyElementDto>>(result, null);
        }

        public async Task<IResponse> GetSupplyElementTemplates()
        {
            var result = (List<SupplyElementTemplateDto>)await _commonService.ExcuteSqlStoredProcedure<SupplyElementTemplateDto>("GetSupplyElementTemplate", null, 1);

            return new Response<List<SupplyElementTemplateDto>>(result, null);
        }

        public async Task<IResponse> GetSupplyChainbyCompanyAndUser(string companyId, string userEmail, string user)
        {
            _ = int.TryParse(companyId, out int ci);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@companyId", ci),
                new SqlParameter("@userEmail", userEmail),
                new SqlParameter("@user", user)
            };

            var result = (SupplyChainDto)await _commonService.ExcuteSqlStoredProcedure<SupplyChainDto>("GetSupplyChainbyCompanyAndUser", parameterList, 2);

            return new Response<SupplyChainDto>(result, null);
        }

        public async Task<IResponse> CreateSupplyChain(object entity, string userEmail)
        {
            var obj = (SupplyChainDto)entity;
            var jsonObj = JsonConvert.SerializeObject(obj);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@supplyChainJson", jsonObj),
                new SqlParameter("@userEmail", userEmail)
            };
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateSupplyChain", parameterList, 2);

            if(result.Result.Equals("OK"))
                return new Response<StoreProcedureLiteResponse>(result, null);
            else
                return new Response<StoreProcedureLiteResponse>(result.Message);
        }

        public async Task<IResponse> UpdateSupplyChain(object entity, string userEmail)
        {
            var obj = (SupplyChainDto)entity;
            var jsonObj = JsonConvert.SerializeObject(obj);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@supplyChainJson", jsonObj),
                new SqlParameter("@userEmail", userEmail)
            };
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateSupplyChain", parameterList, 2);

            if (result.Result.Equals("OK"))
                return new Response<StoreProcedureLiteResponse>(result, null);
            else
                return new Response<StoreProcedureLiteResponse>(result.Message);
        }

        public async Task<IResponse> DeleteSupplyChainElement(object entity, string userEmail)
        {
            var obj = (SupplyChainElementDto)entity;

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idSupplyChain", obj.IdSupplyChain),
                new SqlParameter("@idSupplyChainElement", obj.IdSupplyChainElement),
                new SqlParameter("@userEmail", userEmail)
            };
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("DeleteSupplyChainElement", parameterList, 2);

            if (result.Result.Equals("OK"))
                return new Response<StoreProcedureLiteResponse>(result, null);
            else
                return new Response<StoreProcedureLiteResponse>(result.Message);
        }

        public async Task<object> GetSupplyChainbyCompanyAndUsertoDownload(string companyId, string userEmail, string user)
        {
            _ = int.TryParse(companyId, out int ci);

            CultureInfo cInfo = new CultureInfo("es-CO");
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@companyId", ci),
                new SqlParameter("@userEmail", userEmail),
                new SqlParameter("@user", user)
            };

            var result = (SupplyChainReportDto)await _commonService.ExcuteSqlStoredProcedure<SupplyChainReportDto>("GetSupplyChainbyCompanyAndUsertoDownload", parameterList, 2);

            var emailTemplate = await _commonService.GetHtmlTemplate((int)EnumeratorHtmlTemplate.CADENA_SUMINISTRO);
            var elementsHtml = new List<string>();
            var body = emailTemplate.Body;

            var c = result.SupplyChainElements.Count;
            for (int i = 0; i < c; i++)
            {
                var elementHtml = emailTemplate.AdditionalBody.FirstOrDefault().Html;
                elementHtml = elementHtml.Replace("*Elemento*", result.SupplyChainElements[i].SupplyElementName);
                elementHtml = elementHtml.Replace("*Logo*", result.SupplyChainElements[i].SupplyElementLogo);
                elementHtml = elementHtml.Replace("*Posision*", result.SupplyChainElements[i].Position.ToString());
                elementHtml = elementHtml.Replace("*Responsable*", result.SupplyChainElements[i].ChargePerson ?? "-");
                elementHtml = elementHtml.Replace("*Actividades*", result.SupplyChainElements[i].Activities ?? "-");
                elementHtml = elementHtml.Replace("*Unidad_medida*", result.SupplyChainElements[i].MeasurementUnit ?? "-");
                elementHtml = elementHtml.Replace("*Cantidad*", result.SupplyChainElements[i].Quantity?.ToString("N0", cInfo) ?? "-");
                elementHtml = elementHtml.Replace("*Costo*", result.SupplyChainElements[i].Cost?.ToString("C", cInfo) ?? "-");

                elementsHtml.Add(elementHtml);
            }
            var eh = string.Join(" ", elementsHtml);

            body = body.Replace("*Empresa*", result.CompanyName.ToString());
            body = body.Replace("*Sector/Industria*", result.CompanyIndustry.ToString());
            body = body.Replace("*Fecha_actualizacion*", result.LastUpdateDate.ToString("dd/MM/yyyy"));

            body = body.Replace("*Elementos*", eh);

            body = body.Replace("*Costo_facturacion*", result.BillingCost?.ToString("C", cInfo) ?? "-");
            body = body.Replace("*Costo_total*", result.TotalCost?.ToString("C", cInfo) ?? "-");
            body = body.Replace("*Porcentaje_participacion*", result.SharePercentage?.ToString() +'%' ?? "-");
            body = body.Replace("*urlHost*", _settings.host);

            var byteFile = Helpers.Helpers.GeneratePDFfromHTML(body, _supplyChainSettings.FontsPath);

            return byteFile;
        }
    }
}
