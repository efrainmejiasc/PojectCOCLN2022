using AutoMapper;
using CLN.model.APIModels;
using CLN.model.Dto.CAS;
using CLN.model.Dto.User;
using CLN.model.ErrorMessages;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Extensions;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class UserService : IUserService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        private readonly ICASService _casService;
        private readonly IMapper _mapper;
        private readonly CASUrlSettings _CASUrl;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="commonService"></param>
        /// <param name="casService"></param>
        /// <param name="mapper"></param>
        public UserService(
            CLNContext context,
            ICommonService commonService,
            ICASService casService,
            IMapper mapper,
             IOptions<CASUrlSettings> CASUrlOptions)
        {
            _context = context;
            _commonService = commonService;
            _casService = casService;
            _mapper = mapper;
            _CASUrl = CASUrlOptions.Value;
        }

        /// <inheritdoc />
        public async Task<IResponse> UpdateUserCompaniesInformationAsync(int userId, CancellationToken cancelationToken)
        {
            var dbUser = await (from u in _context.Users
                                where u.IdUser == userId
                                select u).FirstOrDefaultAsync(cancelationToken);

            //var dbUser = await _context.Users
            //    .Include(p => p.UserCompanyProfiles)
            //    .Where(p => p.IdUser == userId)
            //    .FirstOrDefaultAsync(cancelationToken);

            if (dbUser != null)
            {
                var companiesInformation = new List<CompanyProfileDto>();
                var lucp = new List<UserCompanyProfile>();

                if (dbUser.Companies.Length > 0)
                {
                    foreach (var company in dbUser.Companies)
                    {
                        if (company.CompanyId.HasValue)
                        {
                            CompanyProfile companyProfile;
                            var companyInformation = await _casService.GetUserCompanyInformationforCompanyProfile(userId, company.CompanyId.Value, cancelationToken);
                            var response = (Response<CompanyProfileDto>)companyInformation;
                            response.Data.IsOwner = (company.IsOwner.Value || company.IsAdmin.Value) ? true: false;
                            response.Data.IdUser = dbUser.IdUser;
                            companyProfile = _mapper.Map<CompanyProfile>(response.Data);

                            var cp = await (from c in _context.CompanyProfiles
                                            where c.CompanyId == company.CompanyId.Value
                                            select c).FirstOrDefaultAsync(cancelationToken);

                            if (cp == null || cp.Id == 0)
                            {
                                _context.Add(companyProfile);
                                await _context.SaveChangesAsync(cancelationToken);
                                lucp.Add(new UserCompanyProfile() { IdCompanyProfile = companyProfile.Id, IdUser = userId });
                            }
                            else
                            {
                                cp.CompanyName = companyProfile.CompanyName;
                                cp.NumberId = companyProfile.NumberId;
                                cp.Email = companyProfile.Email;
                                cp.PhoneNumber = companyProfile.PhoneNumber;
                                cp.Country = companyProfile.Country;
                                cp.City = companyProfile.City;
                                cp.IsOwner = companyProfile.IsOwner;
                                cp.IndustryMainSector = companyProfile.IndustryMainSector;
                                cp.IdUser = companyProfile.IdUser;
                                cp.MicroBusiness = companyProfile.MicroBusiness;
                                cp.Idtype = companyProfile.Idtype;
                                cp.Characterization = companyProfile.Characterization; //dentro de la caracterizacoin esta lo de genero femenino predominante.
                                cp.CommercialInformation = companyProfile.CommercialInformation;
                                cp.Women51p = companyProfile.Women51p;
                                cp.Women_President = companyProfile.Women_President;

                                _context.Update(cp);
                                await _context.SaveChangesAsync(cancelationToken);

                                var ucp = await (from uc in _context.UserCompanyProfiles
                                                 where uc.IdCompanyProfile == cp.Id && uc.IdUser == userId
                                                 select uc).FirstOrDefaultAsync(cancelationToken);
                                if (ucp == null || ucp.IdUserCompanyProfile == 0)
                                    lucp.Add(new UserCompanyProfile() { IdCompanyProfile = cp.Id, IdUser = userId });
                                else
                                    lucp.Add(ucp);
                            }
                            companiesInformation.Add(response.Data);
                        }
                    }

                    var ucpr = (from map in _context.UserCompanyProfiles
                                where !lucp.Contains(map) && map.IdUser == userId
                                select map).ToList();
                    var ucpn = (from map in lucp
                                where map.IdUserCompanyProfile == 0
                                select map).ToList();

                    ucpr.ForEach(z => _context.UserCompanyProfiles.Remove(z));
                    ucpn.ForEach(z => _context.UserCompanyProfiles.Add(z));
                    await _context.SaveChangesAsync(cancelationToken);
                }

                return new Response<IEnumerable<CompanyProfileDto>>(companiesInformation);
            }

            return new Response<IEnumerable<CompanyProfileDto>>(message: $"{WellKnownErrors.UserNotFound.GetDescription()}");
        }

        /// <inheritdoc />
        public async Task<IResponse> GetUserCompaniesIdentifierAsync(int userId, CancellationToken cancelationToken)
        {
            var dbUser = await _context.Users.Where(p => p.IdUser == userId).FirstOrDefaultAsync(cancelationToken);

            if (dbUser != null)
            {
                return new Response<UserCompaniesIdDto>(new UserCompaniesIdDto { Companies = dbUser.Companies });
            }

            return new Response<UserCompaniesIdDto>(message: $"{WellKnownErrors.UserNotFound.GetDescription()}");
        }

        /// <inheritdoc />
        public async Task<IResponse> GetUserCompaniesAsync(int userId, CancellationToken cancelationToken)
        {
            //var dbUser = await _context.Users.Include(p => p.UserCompanyProfiles)
            //    .Where(p => p.IdUser == userId)
            //    .FirstOrDefaultAsync(cancelationToken);

            var userCompanies = await (from ucp in _context.UserCompanyProfiles
                         join cp in _context.CompanyProfiles on ucp.IdCompanyProfile equals cp.Id
                         where ucp.IdUser == userId
                         select cp).ToListAsync(cancelationToken);

            if (userCompanies != null && userCompanies.Count > 0)
            {
                var response = _mapper.Map<IEnumerable<CompanyProfileDto>>(userCompanies);
                return new Response<IEnumerable<CompanyProfileDto>>(response);
            }

            return new Response<IEnumerable<CompanyProfileDto>>(message: $"{WellKnownErrors.UserNotFound.GetDescription()}");
        }

        /// <inheritdoc />
        public async Task<IResponse> GetUserCompaniesFromCASAsync(int userId, CancellationToken cancelationToken)
        {
            var dbUser = await _context.Users
                .Where(p => p.IdUser == userId)
                .FirstOrDefaultAsync(cancelationToken);

            if (dbUser != null)
            {
                var companiesInformation = new List<CompanyProfileDto>();

                foreach (var company in dbUser.Companies)
                {
                    if (company.CompanyId != null)
                    {
                        var companyInformation = await _casService.GetUserCompanyInformationAsync(company.CompanyId.Value, cancelationToken);
                        var response = (Response<CompanyProfileDto>)companyInformation;
                        response.Data.IsOwner = company.IsOwner.Value || company.IsAdmin.Value ? true : false;
                        companiesInformation.Add(response.Data);
                    }
                }

                return new Response<IEnumerable<CompanyProfileDto>>(companiesInformation);
            }

            return new Response<IEnumerable<CompanyProfileDto>>(message: $"{WellKnownErrors.UserNotFound.GetDescription()}");
        }

        public async Task<object> GetMenubyUser(string idUser)
        {
            _ = int.TryParse(idUser, out int iu);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser", iu)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<object>("GetMenubyRolforList", parameterList, 1);
            return result;
        }

        public async Task<object> GetPermitsbyUserandMenu(string idUser)
        {
            _ = int.TryParse(idUser, out int iu);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser", iu)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<object>("GetPermitsbyMenuRol", parameterList, 1);
            return result;
        }

        public async Task<object> GetMenusandPermitsbyUser(string idUser, string emailUser)
        {
            _ = int.TryParse(idUser, out int iu);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser", iu),
                new SqlParameter("@emailUser", emailUser)
            };

            var result = await _commonService.ExcuteSqlStoredProcedure<UsersMenuDto>("GetMenusandPermitsbyUser", parameterList, 1);
            return result;
        }

        public async Task<IResponse> GetUserCompaniestoManage(string idUser, string emailUser)
        {
            _ = int.TryParse(idUser, out int iu);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser", iu),
                new SqlParameter("@emailUser", emailUser)
            };
            var result = (List<UserCompaniesToManageDto>)await _commonService.ExcuteSqlStoredProcedure<UserCompaniesToManageDto>("GetUserCompaniestoManage", parameterList, 1);

            return new Response<List<UserCompaniesToManageDto>>(result, null);
        }

        public Task<IResponse> CloseSession(string urlCLN)
        {
            string url = _CASUrl.CloseSessionUrl + urlCLN;
            var json = new System.Net.WebClient().DownloadString(url);
            dynamic m = JsonConvert.DeserializeObject(json);
            return m;
        }
        
        public async Task<IResponse> GetUserCompaniestoAppointments(string idUser, string emailUser)
        {
            _ = int.TryParse(idUser, out int iu);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idUser", iu),
                new SqlParameter("@emailUser", emailUser)
            };

            var userCompnies = (List<UserCompaniesToManageDto>)await _commonService.ExcuteSqlStoredProcedure<UserCompaniesToManageDto>("GetUserCompaniestoAppointments", parameterList, 1);

            return new Response<List<UserCompaniesToManageDto>>(userCompnies, null);
        }
    }
}
