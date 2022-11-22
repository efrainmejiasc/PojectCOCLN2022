using CLN.api.Middlewares;
using CLN.api.WepAPI.Middlewares;
using CLN.services.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CLN.api.Extensions
{
    public static class AppExtensions
    {
        /// <summary>
        /// Add swagger middleware
        /// </summary>
        /// <param name="app"></param>
        public static void UseSwaggerExtension(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
#if DEBUG
                // For Debug in Kestrel
                c.SwaggerEndpoint("swagger/v1/swagger.json", "CLN.api v1");
                c.RoutePrefix = string.Empty;
#else
                // To deploy on IIS
                c.SwaggerEndpoint("v1/swagger.json", "CLN.api v1");
#endif
                c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);

            });
        }

        public static void UseErrorHandlingMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorHandlerMiddleware>();
        }

        public static void UseApplyPendingMigrations(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = serviceScope.ServiceProvider.GetService<CLNContext>();
            context.Database.Migrate();
        }

        public static void UseJwtMiddleware(this IApplicationBuilder app)
            => app.UseMiddleware<JwtMiddleware>();
    }
}
