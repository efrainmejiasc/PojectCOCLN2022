using CLN.model.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CLN.api.Extensions
{
    public static class SettingExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddSettingsExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));
            services.Configure<HiringProcessSECOPSURLSettings>(configuration.GetSection("HiringProcessSECOPSURLSettings"));
            services.Configure<CASUrlSettings>(configuration.GetSection("CASUrlSettings"));
            services.Configure<DomainUrlSettings>(configuration.GetSection("DomainUrlSettings"));
            services.Configure<LoginCacheSettings>(configuration.GetSection("LoginCacheSettings"));
            services.Configure<CASSettings>(configuration.GetSection("CASSettings"));
            services.Configure<HttpClientSettings>(configuration.GetSection("HttpClientSettings"));
            services.Configure<ClassifierSettings>(configuration.GetSection("ClassifierSettings"));
            services.Configure<CorrelativeSettings>(configuration.GetSection("CorrelativeSettings"));
            services.Configure<HirigProcessSettings>(configuration.GetSection("HirigProcessSettings"));
            services.Configure<AcquisitionPlanSettings>(configuration.GetSection("AcquisitionPlanSettings"));
            services.Configure<ConsolidatedSettings>(configuration.GetSection("ConsolidatedSettings"));
            services.Configure<FreeMarketAPISettings>(configuration.GetSection("FreeMarketAPISettings"));
            services.Configure<AlertSettings>(configuration.GetSection("AlertSettings"));
            services.Configure<VirtualAppointmentSettings>(configuration.GetSection("VirtualAppointmentSettings"));
            services.Configure<SupplyChainSettings>(configuration.GetSection("SupplyChainSettings"));
            services.Configure<ConnectionSettings>(configuration.GetSection("ConnectionStrings"));
        }
    }
}
