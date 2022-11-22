using CLN.model.Dto.CAS;
using CLN.model.Models;
using CLN.services.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CLN.services.Persistence
{
    /// <summary>
    /// 
    /// </summary>
    public sealed class CLNContext : CLNScaffoldDbContext
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public CLNContext(
            [NotNull] DbContextOptions<CLNScaffoldDbContext> options)
            : base(options)
        {
            ChangeTracker.LazyLoadingEnabled = false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CompanyProfile>(entity =>
            {
                entity.Property(e => e.IndustryMainSector)
                    .HasConversion(Conversores.ConverterAnyObject<KeyValuePair<string, string>[]>());
            });

            builder.Entity<User>(entity =>
            {
                entity.Property(e => e.Companies)
                    .HasConversion(Conversores.ConverterAnyObject<CompanyToSaveDto[]>());
            });

            base.OnModelCreating(builder);
        }
    }
}
