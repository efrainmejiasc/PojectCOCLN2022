using AutoMapper;
using CLN.api.Filters;
using CLN.api.Helpers;
using CLN.api.Validators;
using CLN.model.ErrorMessages;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services;
using CLN.services.Interfaces;
using CLN.services.Interfaces.HttpClient;
using CLN.services.Persistence;
using CLN.services.Services;
using CLN.Services.Email;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Polly;
using Polly.Extensions.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;

namespace CLN.api.Extensions
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// Register swagger
        /// </summary>
        /// <param name="services"></param>
        public static void AddSwaggerExtension(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(t => t.FullName);

                options.UseInlineDefinitionsForEnums();
                options.DescribeAllParametersInCamelCase();
                options.UseAllOfToExtendReferenceSchemas();
                options.SchemaFilter<SwaggerExcludeFilter>();

                var versions = new[] { "v1" };

                foreach (var version in versions)
                {
                    options.SwaggerDoc(version, new OpenApiInfo
                    {
                        Title = "CLN.api",
                        Version = version,
                        Description = "Servicios para la aplicación Colombia Compra Lo Nuestro",
                        Contact = new OpenApiContact
                        {
                            Name = "Ivolucion",
                            Email = "ivolucion@Ivolucion.com"
                        }
                    });
                }

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Description = "Input your Bearer token in this format - Bearer {your token here} to access this API",
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                            Scheme = "Bearer",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        }, new List<string>()
                    },
                });

                options.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddSwaggerGenNewtonsoftSupport();
        }

        /// <summary>
        /// Register api versioning
        /// </summary>
        /// <param name="services"></param>
        public static void AddApiVersioningExtension(this IServiceCollection services)
        {
            services.AddApiVersioning(config =>
            {
                // Specify the default API Version as 1.0
                config.DefaultApiVersion = new ApiVersion(1, 0);
                // If the client hasn't specified the API version in the request, use the default API version number 
                config.AssumeDefaultVersionWhenUnspecified = true;
                // Advertise the API versions supported for the particular endpoint
                config.ReportApiVersions = true;
            });

            services.AddVersionedApiExplorer(o =>
            {
                o.GroupNameFormat = "'v'VVV";
                o.SubstituteApiVersionInUrl = true;
            });
        }

        /// <summary>
        /// Register authentication
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddAuthenticationExtension(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = configuration.GetSection("AppSettings").Get<AppSettings>();
            var tokenKey = settings.Secret;
            var key = Encoding.ASCII.GetBytes(tokenKey);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.IncludeErrorDetails = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = settings.ClnIssuerJwt,
                        ValidAudience = settings.ClnAudienceJwt,
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });
            //services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(x =>
            //{
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(key),
            //        ValidateIssuer = false,
            //        ValidateAudience = false
            //    };
            //});
        }

        /// <summary>
        /// Register context and services
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void ConfigureDependencyInjectionExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CLNScaffoldDbContext>(options
              => options.UseSqlServer(configuration.GetConnectionString("clnDatabase")), ServiceLifetime.Scoped);
            services.AddDbContext<CLNContext>(options
              => options.UseSqlServer(configuration.GetConnectionString("clnDatabase")), ServiceLifetime.Scoped);
        }

        /// <summary>
        /// Register mvc
        /// </summary>
        /// <param name="services"></param>
        public static void AddMvcExtension(this IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.EnableEndpointRouting = false;
            })
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                    options.JsonSerializerOptions.DictionaryKeyPolicy = null;
                })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    //options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.SuppressModelStateInvalidFilter = true;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        /// <summary>
        /// Register http clients from assembly
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddHttpClientsExtension(this IServiceCollection services, IConfiguration configuration)
        {
            var httpClientSettings = configuration.GetSection("AppSettings").Get<HttpClientSettings>();

            var addAssemblyHttpClient = typeof(ServiceExtensions)
                  .GetMethod(nameof(AddHttpClient), BindingFlags.NonPublic | BindingFlags.Static);
            var types = typeof(IClientService).GetConcreteTypes();

            foreach (var type in types)
            {
                var typeInterface = type.GetInterfaces()
                    .Where(p => p != typeof(IClientService))
                    .First();

                FieldInfo info = type.GetField("_attempts", BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.FlattenHierarchy);
                var attempts = info != null ? info.GetValue(null) : httpClientSettings.Attempts;

                var methodInfo = addAssemblyHttpClient.MakeGenericMethod(typeInterface, type);
                methodInfo.Invoke(null, new object[] { services, attempts });
            }
        }

        /// <summary>
        /// Add http clients
        /// </summary>
        /// <typeparam name="TClient"></typeparam>
        /// <typeparam name="TImplementation"></typeparam>
        /// <param name="services"></param>
        /// <param name="attempts"></param>
        private static void AddHttpClient<TClient, TImplementation>(IServiceCollection services, int attempts)
            where TClient : class
            where TImplementation : class, TClient =>
            services.AddHttpClient<TClient, TImplementation>().AddPolicyHandler(GetRetryPolicy(attempts));

        /// <summary>
        /// Retry policy
        /// </summary>
        /// <param name="attempts"></param>
        /// <returns></returns>
        private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy(int attempts)
        {
            return HttpPolicyExtensions
            .HandleTransientHttpError()
            //.OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
            .WaitAndRetryAsync(attempts, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        }

        /// <summary>
        /// Add auto mapper
        /// </summary>
        /// <param name="services"></param>
        public static void AddMapperExtension(this IServiceCollection services)
        {
            var addCustomMap = typeof(ServiceExtensions)
                .GetMethod(nameof(AddCustomMap), BindingFlags.NonPublic | BindingFlags.Static);

            var values = MappingProfile.FindValuesToCustomMap(new Assembly[] { typeof(WellKnownErrors).Assembly });

            services.AddAutoMapper(config =>
            {
                foreach (var methodInfo in from value in values
                                           let methodInfo = addCustomMap.MakeGenericMethod(value.Item1, value.Item2, value.Item3)
                                           select methodInfo)
                {
                    methodInfo.Invoke(null, new object[] { config });
                }
            }, typeof(Startup).Assembly, typeof(WellKnownErrors).Assembly);
        }

        /// <summary>
        /// Create custom map
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TDestination"></typeparam>
        /// <typeparam name="TConverter"></typeparam>
        /// <param name="config"></param>
        private static void AddCustomMap<TSource, TDestination, TConverter>(IMapperConfigurationExpression config)
            where TSource : class
            where TDestination : class
            where TConverter : class, ITypeConverter<TSource, TDestination> =>
                config.CreateMap<TSource, TDestination>()
                    .ConstructUsingServiceLocator()
                    .ConvertUsing<TConverter>();

        /// <summary>
        /// Add CLN services
        /// </summary>
        /// <param name="services"></param>
        public static void AddCLNServicesExtension(this IServiceCollection services)
        {
            services.AddSingleton<ICustomCache, CustomCache>();
            services.AddSingleton<ISequentialGuidGenerator, SequentialGuidGenerator>();
            services.AddScoped<IAutenticationService, AutenticationService>();
            services.AddScoped<ICommonService, CommonService>();
            services.AddScoped<IHomeComponentService, HomeComponentService>();
            services.AddScoped<IHiringProcessService, HiringProcessService>();
            services.AddScoped<ICASService, CASService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICPCIIUUNSPSCCLNCorrelativeService, CPCIIUUNSPSCCLNCorrelativeService>();
            services.AddScoped<IUNSPSCClassifierService, UNSPSCClassifierService>();
            services.AddScoped<ISenderMailProcessService, SenderMailProcessService>();
            services.AddScoped<ICheckOffersService, CheckOffersService>();
            services.AddScoped<ICompanyInterestService, CompanyInterestService>();
            services.AddScoped<IAcquisitionPlansService, AcquisitionPlansService>();
            services.AddScoped<IFreeMarketService, FreeMarketService>();
            services.AddScoped<INewsTrendsComponentService, NewsTrendsComponentService>();
            services.AddScoped<AlertValidator, AlertValidator>();
            services.AddScoped<IGTrendsService, GTrendsService>();
            services.AddScoped<IReportTrendsService, ReportTrendsService>();
            services.AddScoped<IPatagonianReportService, PatagonianReportService>();
            services.AddScoped<IVirtualAppointmentsService, VirtualAppointmentsService>();
            services.AddScoped<IScheduledVirtualAppointmentsService, ScheduledVirtualAppointmentsService>();
            services.AddScoped<ICitationFindingsFormService, CitationFindingsFormService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IReportVirtualAppointmentsService, ReportVirtualAppointmentsService>();
            services.AddScoped<IQuizAnswersService, QuizAnswersService>(); 
            services.AddScoped<ISupplyChainService, SupplyChainService>(); 
        }
    }
}
