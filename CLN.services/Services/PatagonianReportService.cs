using CLN.services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using CLN.model.Settings;
using CLN.model.APIModels.UIC;
using CLN.services.Persistence;
using Microsoft.Data.SqlClient;
using CLN.model.APIModels;
using CLN.services.Wrappers;
using CLN.model.APIModels.BO;

namespace CLN.services.Services
{
    public class PatagonianReportService: IPatagonianReportService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;

        public PatagonianReportService(CLNContext context, ICommonService commonService)
        {
            _context = context;
            _commonService = commonService;
        }


        public async Task<IResponse> SetDataDbPatagonianAsync(string clientToken,string urlBase, string userInCourseUrl, 
                                                              string companyInCourseUrl, string communityUrl, string businessOpportunityUrl, 
                                                              string companyInCommunityUrl, string applicationsProductsServicesUrl)
        {
            var response = new List<PatagonianResponse>();

            var result = await GetUserInCoursePatagonian(clientToken, urlBase, userInCourseUrl);
            var single = new PatagonianResponse() { Process = "Usuarios en curso patagonian", Result = result };
            response.Add(single);

            result = await GetCompanyInCoursePatagonian(clientToken, urlBase, companyInCourseUrl);
            single = new PatagonianResponse() { Process = "Empresas en curso patagonian", Result = result };
            response.Add(single);

            result = await GetUserInCommunityPatagonian(clientToken, urlBase,  communityUrl);
            single = new PatagonianResponse() { Process = "Usuarios en comunidades patagonian", Result = result };
            response.Add(single);

            result = await GetPatagonianBuyAdsInSectorIndustry(clientToken, urlBase, businessOpportunityUrl);
            single = new PatagonianResponse() { Process = "Anuncios en Sector/Industria patagonian", Result = result };
            response.Add(single);

            result = await GetCompanyInCommunityPatagonian(clientToken, urlBase, companyInCommunityUrl);
            single = new PatagonianResponse() { Process = "Empresas en comunidades patagonian", Result = result };
            response.Add(single);

            result = await GetApplicationForProductsServicesPatagonian(clientToken, urlBase,  applicationsProductsServicesUrl);
            single = new PatagonianResponse() { Process = "Postulaciones por productos o servicios patagonian", Result = result };
            response.Add(single);

            return new Response<List<PatagonianResponse>>(response, null);
        }


        #region METODOS PARA DB

        public async Task<bool> GetUserInCoursePatagonian(string clientToken, string urlBase, string userInCourseUrl)
        {
            var resultado = false;
            var intCount = 0;
            var strResponse = String.Empty;
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            ProcessResult processResult = new();
            var success = true;

            do
            {
                try
                {
                    var userCourse = await GetDataPatagoniaAsync(clientToken, urlBase + userInCourseUrl);


                    foreach (var uc in userCourse.ToList())
                    {
                        SqlParameter[] parameterList = new SqlParameter[]
                        {
                          new SqlParameter("@courseName", uc.Key.Trim()),
                          new SqlParameter("@numberMember", uc.Value.Count)
                        };

                        var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateUserInCoursePatagonian", parameterList, 2);
                    }

                    processResult.ServiceUrl = urlBase + userInCourseUrl;
                    processResult.Result = "Exitoso";
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, "Usuarios en curso patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    resultado = true;
                    break;
                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    success = false;
                    processResult.ServiceUrl = urlBase + userInCourseUrl;
                    processResult.Result = "Fallido";
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, "Usuarios en curso patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    intCount++;

                }



            } while (intCount <= 2);

            return resultado;
        }

        public async Task<bool> GetCompanyInCoursePatagonian(string clientToken, string urlBase, string companyInCourseUrl)
        {
            var resultado = false;
            var intCount = 0;
            var strResponse = String.Empty;
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            ProcessResult processResult = new();
            var success = true;


            do
            {
                try
                {

                    var companyCourse = await GetDataPatagoniaAsync(clientToken, urlBase + companyInCourseUrl);


                    foreach (var cc in companyCourse.ToList())
                    {
                        SqlParameter[] parameterList = new SqlParameter[]
                        {
                          new SqlParameter("@courseName", cc.Key.Trim()),
                          new SqlParameter("@numberCompany", cc.Value.Count)
                        };

                        var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateCompanyInCoursePatagonian", parameterList, 2);
                    }

                    processResult.ServiceUrl = urlBase + companyInCourseUrl;
                    processResult.Result = "Exitoso";
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, "Empresas en curso patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    resultado = true;
                    break;
                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    success = false;
                    processResult.ServiceUrl = urlBase + companyInCourseUrl;
                    processResult.Result = "Fallido";
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, "Empresas en curso patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    intCount++;
                }



            } while (intCount <= 2);

            return resultado;
        }

        public async Task<bool> GetUserInCommunityPatagonian(string clientToken, string urlBase, string communityUrl)
        {
            var resultado = false;
            var intCount = 0;
            var strResponse = String.Empty;
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            ProcessResult processResult = new();
            var success = true;

            do
            {
                try
                {
                    var offset = 0;
                    var end = false;
                    var lstUserCommunity = new List<PatagonianUserCommunity>();
                    var url = String.Format(urlBase + communityUrl, offset);

                    do
                    {
                        var singleCommunity = await GetDataPatagoniaAsync<PatagonianUserCommunity>(clientToken, url);
                        if (singleCommunity.total_items != 0)
                        {
                            lstUserCommunity.Add(singleCommunity);
                            offset = offset + singleCommunity.total_items;
                            url = String.Format(urlBase + communityUrl, offset);
                        }
                        else
                            end = true;
                    }
                    while (!end);

                    offset = 0;
                    var userCommunity = lstUserCommunity.Select(x => x._embedded.community).ToList();

                    foreach (var ucm_ in userCommunity)
                    {
                        foreach (var ucm in ucm_)
                        {
                            SqlParameter[] parameterList = new SqlParameter[]
                            {
                               new SqlParameter("@idCommunity", ucm.id),
                               new SqlParameter("@communityName", ucm.name.Trim()),
                               new SqlParameter("@numberMember", ucm.members_number),
                               new SqlParameter("@category", ucm.category.Trim())
                            };

                            var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateUserInCommunityPatagonian", parameterList, 2);
                        }
                    }


                    processResult.ServiceUrl = url;
                    processResult.Result = "Exitoso";
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, "Usuario en comunidad patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    resultado = true;
                    break;
                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    success = false;
                    processResult.ServiceUrl = urlBase + communityUrl;
                    processResult.Result = "Fallido";
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, "Usuario en comunidad patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    intCount++;
                }


            } while (intCount <= 2);

            return resultado;
        }

        public async Task<bool> GetPatagonianBuyAdsInSectorIndustry(string clientToken, string urlBase, string businessOpportunityUrl)
        {
            var resultado = false;
            var intCount = 0;
            var strResponse = String.Empty;
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            ProcessResult processResult = new();
            var success = true;

            do
            {
                try
                {
                    var offset = 0;
                    var end = false;
                    var lstBusinessOpportunity = new List<PatagonianBusinessOpportunity>();
                    var url = String.Format(urlBase + businessOpportunityUrl, offset);

                    do
                    {
                        var single = await GetDataPatagoniaAsync<PatagonianBusinessOpportunity>(clientToken, url);
                        if (single.total_items != 0)
                        {
                            lstBusinessOpportunity.Add(single);
                            offset = offset + single.total_items;
                            url = String.Format(urlBase + businessOpportunityUrl, offset);
                        }
                        else
                            end = true;
                    }
                    while (!end);

                    offset = 0;
                    var businessOpportunity = lstBusinessOpportunity.Select(x => x._embedded.business_opportunity).ToList();

                    var dicIndustria = new Dictionary<string, string>();
                    foreach (var bo_ in businessOpportunity)
                    {
                        foreach (var xbo in bo_)
                        {
                            if (dicIndustria.Count > 0)
                            {
                                if (!dicIndustria.ContainsKey(xbo.industry.Trim()))
                                {
                                    dicIndustria.Add(xbo.industry.Trim(), xbo.industry_id.Trim());
                                }
                                else
                                {
                                    string valueInternal = string.Empty;
                                    var value = dicIndustria.TryGetValue(xbo.industry.Trim(), out valueInternal);
                                    if (!dicIndustria.ContainsValue(valueInternal.Trim()))
                                        dicIndustria.Add(xbo.industry.Trim(), xbo.industry_id.Trim());
                                }
                            }
                            else
                                dicIndustria.Add(xbo.industry.Trim(), xbo.industry_id.Trim());
                        }
                    }

                    var lst = new List<PatagonianBuyAdsInSectorIndustry>();
                    foreach (var k in dicIndustria.ToList())
                    {
                        var model = SetPatagonianBuyAdsInSectorIndustry(k.Key, k.Value, businessOpportunity);
                        lst.Add(model);
                    }

                    foreach (var s in lst)
                    {
                        SqlParameter[] parameterList = new SqlParameter[]
                        {      
                               new SqlParameter("@industryId", s.IndustryId),
                               new SqlParameter("@industry", s.Industry),
                               new SqlParameter("@numberAds", s.NumberAds),
                        };

                        var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreatePatagonianBuyAdsInSectorIndustry", parameterList, 2);
                    }



                    processResult.ServiceUrl = url;
                    processResult.Result = "Exitoso";
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, "Anuncios en Sector/Industria patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    resultado = true;
                    break;
                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    success = false;
                    processResult.ServiceUrl = urlBase + businessOpportunityUrl;
                    processResult.Result = "Fallido";
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, "Anuncios en Sector/Industria patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    intCount++;
                }


            } while (intCount <= 2);

            return resultado;
        }

        private PatagonianBuyAdsInSectorIndustry SetPatagonianBuyAdsInSectorIndustry(string key, string value, List<List<BusinessOpportunity>> businessOpportunity)
        {
            var number = 0;
            foreach (var bo_ in businessOpportunity)
            {
                number = number + bo_.Where(x => x.industry == key).ToList().Count;
            }

            var model = new PatagonianBuyAdsInSectorIndustry()
            {
                Industry = key,
                IndustryId = value,
                NumberAds = number
            };

            return model;
        }

        public async Task<bool> GetCompanyInCommunityPatagonian(string clientToken, string urlBase, string companyInCommunityUrl)
        {
            var resultado = false;
            var intCount = 0;
            var strResponse = String.Empty;
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            ProcessResult processResult = new();
            var success = true;

            do
            {
                try
                {
                    var resultData = await GetDataPatagoniaAsync(clientToken, urlBase + companyInCommunityUrl);

                    var companyInCommunity = new List<PatagonianCompanyInCommunity>();
                    var community = new PatagonianCompanyInCommunity();

                    foreach (var item in resultData.ToList())
                    {
                        community.CommunityName = item.Key;
                        community.CompanyProperty = new List<CompanyProperty>();
                        foreach (var subItem in item.Value)
                        {
                            var single = JsonConvert.DeserializeObject<CompanyProperty>(subItem.ToString());
                            community.CompanyProperty.Add(single);
                        }
                        companyInCommunity.Add(community);
                        community = new PatagonianCompanyInCommunity();
                    }


                    foreach (var cc in companyInCommunity)
                    {
                        SqlParameter[] parameterList = new SqlParameter[]
                        {
                          new SqlParameter("@communityName", cc.CommunityName),
                          new SqlParameter("@numberCompany", cc.CompanyProperty.Count)
                        };

                        var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateCompanyInCommunityPatagonian", parameterList, 2);
                    }

                    processResult.ServiceUrl = urlBase + companyInCommunityUrl;
                    processResult.Result = "Exitoso";
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, "Usuarios en curso patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    resultado = true;
                    break;
                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    success = false;
                    processResult.ServiceUrl = urlBase + companyInCommunityUrl;
                    processResult.Result = "Fallido";
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, "Usuarios en curso patagonian", dateStartProcess, dateEndProcess, success, processResult, 1);
                    intCount++;

                }



            } while (intCount <= 2);

            return resultado;
        }

        public async Task<bool> GetApplicationForProductsServicesPatagonian(string clientToken, string urlBase, string applicationsProductsServicesUrl)
        {
            var resultado = false;
            var intCount = 0;
            var strResponse = String.Empty;
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            ProcessResult processResult = new();
            var success = true;

            do
            {
                try
                {
                    var url = String.Format(urlBase + applicationsProductsServicesUrl, "2019-01-01", DateTime.Now.ToString("yyyy-MM-dd"));
                    var resultData = await GetDataPatagoniaStrAsync(clientToken,url);
                    var objs = JsonConvert.DeserializeObject<List<object>>(resultData);
                    var productsServices = new List<PatagonianApplicationsForProductsService>();
                    var single = new PatagonianApplicationsForProductsService();
                    foreach (var item in objs)
                    {
                        single = JsonConvert.DeserializeObject<PatagonianApplicationsForProductsService>(item.ToString());
                        if(!string.IsNullOrEmpty(single.Products))
                           productsServices.Add(single);

                        single = new PatagonianApplicationsForProductsService();
                    }
                    var allProductsService = productsServices.Where(x => x.Products != null).Select(x => x.Products).Distinct().ToList();

                    //***************************************************************************************************************************************************
                    url = String.Format(urlBase + applicationsProductsServicesUrl, DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd"), DateTime.Now.ToString("yyyy-MM-dd"));
                    objs = JsonConvert.DeserializeObject<List<object>>(resultData);
                    productsServices = new List<PatagonianApplicationsForProductsService>();
                    single = new PatagonianApplicationsForProductsService();
                    foreach (var item in objs)
                    {
                        single = JsonConvert.DeserializeObject<PatagonianApplicationsForProductsService>(item.ToString());
                        if (!string.IsNullOrEmpty(single.Products))
                            productsServices.Add(single);

                        single = new PatagonianApplicationsForProductsService();
                    }

                    var countItem = 0;
                    foreach (var ps in allProductsService)
                    {
                        countItem = productsServices.Where(x => x.Products.Trim() == ps.Trim()).ToList().Count;

                        if(countItem > 0)
                        {
                          SqlParameter[] parameterList = new SqlParameter[]
                          {
                             new SqlParameter("@productServiceName", ps.Trim()),
                             new SqlParameter("@numberItem",countItem)
                          };

                            var result = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateApplicationForProductsServicesPatagonian", parameterList, 2);
                        }
                    }

                    processResult.ServiceUrl = urlBase + applicationsProductsServicesUrl;
                    processResult.Result = "Exitoso";
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, "Postulaciones por productos o servicios", dateStartProcess, dateEndProcess, success, processResult, 1);
                    resultado = true;
                    break;
                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    success = false;
                    processResult.ServiceUrl = urlBase + applicationsProductsServicesUrl;
                    processResult.Result = "Fallido";
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, "Postulaciones por productos o servicios", dateStartProcess, dateEndProcess, success, processResult, 1);
                    intCount++;

                }



            } while (intCount <= 2);

            return resultado;
        }
        #endregion

        #region HHTPREQUEST

        public async Task<Dictionary<string, List<object>>> GetDataPatagoniaAsync(string clientToken, string url)
        {
            var respuesta = string.Empty;
            var result = new Dictionary<string, List<object>>();
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("clientToken", clientToken);
            HttpResponseMessage response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<Dictionary<string, List<object>>>(respuesta);
            }

            return result;
        }

        public async Task<T> GetDataPatagoniaAsync<T>(string clientToken, string url)
        {
            var respuesta = string.Empty;
            Type typeOfObject = typeof(T);
            T result = (T)Activator.CreateInstance(typeOfObject);

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("clientToken", clientToken);
            HttpResponseMessage response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<T>(respuesta);
            }

            return result;
        }

        public async Task<string> GetDataPatagoniaStrAsync(string clientToken, string url)
        {
            var respuesta = string.Empty;

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("clientToken", clientToken);
            HttpResponseMessage response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
            }

            return respuesta;
        }

        #endregion

    }
}
