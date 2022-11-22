using System.Text;
using System.Text.Json.Serialization;
using CLN.api.Extensions;
using CLN.model.Settings;
using CLN.services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace CLN.api
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private AppSettings aS;
        private bool eS;

        public Startup(IConfiguration configuration)
        {
            _config = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSettingsExtension(_config);
            services.ConfigureDependencyInjectionExtension(_config);
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithExposedHeaders("Content-Disposition"));
            });

            aS = _config.GetSection("AppSettings").Get<AppSettings>();
            eS = aS.EnableSwagger;
            if (eS) { services.AddSwaggerExtension(); }

            services.AddControllers();

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

            services.AddAuthenticationExtension(_config);
            services.AddHttpContextAccessor();
            services.AddApiVersioningExtension();
            services.AddHttpClientsExtension(_config);
            services.AddMapperExtension();
            services.AddCLNServicesExtension();
            services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            //services.AddMvcExtension();
        }
        ///
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.ApplyPendingMigrations();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            if (eS) { app.UseSwaggerExtension(); }
            
            app.UseErrorHandlingMiddleware();
            app.UseHttpsRedirection();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseRouting();
            app.UseJwtMiddleware();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
