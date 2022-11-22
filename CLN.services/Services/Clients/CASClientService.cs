using CLN.model.Dto.CAS;
using CLN.model.Settings;
using CLN.services.Interfaces.HttpClient;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace CLN.services.Services.Clients
{
    /// <inheritdoc />
    public class CASClientService : ICASClientService
    {
        private readonly HttpClient _httpClient;
        private readonly CASSettings _CASSettings;
        private readonly CASUrlSettings _CASUrl;
        private readonly DomainUrlSettings _domainUrl;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpClient"></param>
        /// <param name="CASOptions"></param>
        /// <param name="CASUrlOptions"></param>
        /// <param name="domainUrlOptions"></param>
        public CASClientService(
            HttpClient httpClient,
            IOptions<CASSettings> CASOptions,
            IOptions<CASUrlSettings> CASUrlOptions,
            IOptions<DomainUrlSettings> domainUrlOptions
            )
        {
            _httpClient = httpClient;
            _CASSettings = CASOptions.Value;
            _CASUrl = CASUrlOptions.Value;
            _domainUrl = domainUrlOptions.Value;

            _httpClient.BaseAddress = new Uri(_CASUrl.BaseUrl);
            _httpClient.DefaultRequestHeaders.Add(nameof(CASSettings.clientToken), _CASSettings.clientToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetBasicUserInformationAsync(Guid id, string ticket, CancellationToken cancelationToken)
        {
            var formDataContent = new MultipartFormDataContent()
            {
                { new StringContent(ticket), nameof(TicketDataFormDto.cas_ticket)},
                { new StringContent($"{_domainUrl.BaseUrl}/api/CAS/setTicket/{id}"), nameof(TicketDataFormDto.service_path)}
            };

            return await _httpClient.PostAsync($"{_CASUrl.UserUrl}", formDataContent, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetUserProfileAsync(string token, CancellationToken cancelationToken)
        {
            _httpClient.DefaultRequestHeaders.Add("token", token);
            return await _httpClient.GetAsync(_CASUrl.ProfileUrl, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> ForgotPasswordAsync(string email, CancellationToken cancelationToken)
        {
            var formDataContent = new MultipartFormDataContent()
            {
                { new StringContent(email), nameof(email)}
            };

            return await _httpClient.PostAsync($"{_CASUrl.ForgotPassword}", formDataContent, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetUserCompanyInformationAsync(int companyId, CancellationToken cancelationToken)
        {
            var url = $"{_CASUrl.CompanyUrl}/{companyId}";
            return await _httpClient.GetAsync(url, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetCLNEventsAsync(string items, string offset, CancellationToken cancelationToken)
        {
            var url = $"{_CASUrl.EventsUrl}";
            url = url.Replace("+items_per_page+", items).Replace("+offset+", offset).Replace("+country+", _CASUrl.ColombiaId);
            return await _httpClient.GetAsync(url, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetCLNServicesAsync(string items, string offset, CancellationToken cancelationToken)
        {
            var url = $"{_CASUrl.ServicesUrl}";
            url = url.Replace("+items_per_page+", items).Replace("+offset+", offset).Replace("+country+", _CASUrl.ColombiaId);
            return await _httpClient.GetAsync(url, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetCLNCommunitiesAsync(string items, string offset, CancellationToken cancelationToken)
        {
            var url = $"{_CASUrl.ComunitiesUrls}";
            url = url.Replace("+items_per_page+", items).Replace("+offset+", offset);
            return await _httpClient.GetAsync(url, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetCLNCommunityDetailAsync(int comunityId, CancellationToken cancelationToken)
        {
            var url = $"{_CASUrl.CompanyUrl}/{comunityId}";
            //url = url.Replace("+items_per_page+", items).Replace("+offset+", offset).Replace("+country+", country);
            return await _httpClient.GetAsync(url, cancelationToken);
        }

        /// <inheritdoc />
        public async Task<HttpResponseMessage> GetCLNBusinessOpportunitiesAsync(string items, string offset, CancellationToken cancelationToken)
        {
            var url = $"{_CASUrl.BusinessOpportunitiesUrl}";
            url = url.Replace("+items_per_page+", items).Replace("+offset+", offset).Replace("+country+", _CASUrl.ColombiaId);
            return await _httpClient.GetAsync(url, cancelationToken);
        }
    }
}
