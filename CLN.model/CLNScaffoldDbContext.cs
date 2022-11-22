using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CLN.model.Models
{
    public partial class CLNScaffoldDbContext : DbContext
    {
        public CLNScaffoldDbContext()
        {
        }

        public CLNScaffoldDbContext(DbContextOptions<CLNScaffoldDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AcquisitionPlan> AcquisitionPlans { get; set; }
        public virtual DbSet<AcquisitionPlansCompanyOffer> AcquisitionPlansCompanyOffers { get; set; }
        public virtual DbSet<Audit> Audits { get; set; }
        public virtual DbSet<CompanyInterest> CompanyInterests { get; set; }
        public virtual DbSet<CompanyInterestDepartment> CompanyInterestDepartments { get; set; }
        public virtual DbSet<CompanyInterestMode> CompanyInterestModes { get; set; }
        public virtual DbSet<CompanyInterestMunicipality> CompanyInterestMunicipalities { get; set; }
        public virtual DbSet<CompanyInterestNotification> CompanyInterestNotifications { get; set; }
        public virtual DbSet<CompanyInterestStage> CompanyInterestStages { get; set; }
        public virtual DbSet<CompanyInterestUnspscclassifier> CompanyInterestUnspscclassifiers { get; set; }
        public virtual DbSet<CompanyProfile> CompanyProfiles { get; set; }
        public virtual DbSet<CpCiiuUnspscClnCorrelative> CpCiiuUnspscClnCorrelatives { get; set; }
        public virtual DbSet<Domain> Domains { get; set; }
        public virtual DbSet<DomainType> DomainTypes { get; set; }
        public virtual DbSet<EmailSending> EmailSendings { get; set; }
        public virtual DbSet<FormatHtml> FormatHtmls { get; set; }
        public virtual DbSet<HiringProcess> HiringProcesses { get; set; }
        public virtual DbSet<HiringProcessCompanyOffer> HiringProcessCompanyOffers { get; set; }
        public virtual DbSet<HomeComponent> HomeComponents { get; set; }
        public virtual DbSet<HomeComponentAttribute> HomeComponentAttributes { get; set; }
        public virtual DbSet<MailDiario> MailDiarios { get; set; }
        public virtual DbSet<MailMensual> MailMensuals { get; set; }
        public virtual DbSet<MailSemanal> MailSemanals { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<MenuRol> MenuRols { get; set; }
        public virtual DbSet<MenuRolPermit> MenuRolPermits { get; set; }
        public virtual DbSet<MessageResponse> MessageResponses { get; set; }
        public virtual DbSet<Permit> Permits { get; set; }
        public virtual DbSet<ProcesoxMail> ProcesoxMails { get; set; }
        public virtual DbSet<ProcessLog> ProcessLogs { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<RolPermit> RolPermits { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Template> Templates { get; set; }
        public virtual DbSet<TerritorialEntity> TerritorialEntities { get; set; }
        public virtual DbSet<Testmail> Testmails { get; set; }
        public virtual DbSet<UnspscClassifier> UnspscClassifiers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserCompanyProfile> UserCompanyProfiles { get; set; }
        public virtual DbSet<ViewAudit> ViewAudits { get; set; }
        public virtual DbSet<ViewNotificationType> ViewNotificationTypes { get; set; }
        public virtual DbSet<ViewPublicHiringProcessesMode> ViewPublicHiringProcessesModes { get; set; }
        public virtual DbSet<ViewPublicHiringProcessesStage> ViewPublicHiringProcessesStages { get; set; }
        public virtual DbSet<ViewUnspscclassifierClass> ViewUnspscclassifierClasses { get; set; }
        public virtual DbSet<ViewUnspscclassifierFamily> ViewUnspscclassifierFamilies { get; set; }
        public virtual DbSet<ViewUnspscclassifierProduct> ViewUnspscclassifierProducts { get; set; }
        public virtual DbSet<ViewUnspscclassifierSegment> ViewUnspscclassifierSegments { get; set; }
        //public virtual DbSet<SessionToken> SessionTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Name=ConnectionStrings:clnDatabase");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AcquisitionPlan>(entity =>
            {
                entity.HasKey(e => e.IdAcquisitionPlans)
                    .HasName("PK__Acquisit__2BD366C0B6318CEB");

                entity.Property(e => e.IdAcquisitionPlans).HasColumnName("idAcquisitionPlans");

                entity.Property(e => e.AcquisitionValue)
                    .HasMaxLength(50)
                    .HasColumnName("acquisitionValue")
                    .HasComment("Valor adquisición");

                entity.Property(e => e.CategoriesCodes)
                    .HasColumnName("categoriesCodes")
                    .HasComment("Código UNSPSC");

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .HasColumnName("city")
                    .HasComment("Municipio en el que se encuentra registrada la entidad estatal compradora");

                entity.Property(e => e.ContactEmail)
                    .HasMaxLength(300)
                    .HasColumnName("contactEmail")
                    .HasComment("Email contacto");

                entity.Property(e => e.ContactInfo)
                    .HasMaxLength(300)
                    .HasColumnName("contactInfo")
                    .HasComment("Nombre contacto");

                entity.Property(e => e.ContactPhone)
                    .HasMaxLength(300)
                    .HasColumnName("contactPhone")
                    .HasComment("Teléfono contacto");

                entity.Property(e => e.CreatedDate)
                    .HasMaxLength(50)
                    .HasColumnName("createdDate")
                    .HasComment("Fecha de creación");

                entity.Property(e => e.Department)
                    .HasMaxLength(100)
                    .HasColumnName("department")
                    .HasComment("Departamento en el que se encuentra registrada la entidad estatal compradora");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasComment("Descripción");

                entity.Property(e => e.EntityName)
                    .HasColumnName("entityName")
                    .HasComment("Nombre de la Entidad del estado a la que corresponde el proceso");

                entity.Property(e => e.IdPaa)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("idPaa");

                entity.Property(e => e.InitDate)
                    .HasMaxLength(300)
                    .HasColumnName("initDate")
                    .HasComment("Fecha inicio Proceso de Contratación");

                entity.Property(e => e.IsSecopOne)
                    .HasColumnName("isSecopOne")
                    .HasComment("Es secop I o No (1=Si, 0=No)");

                entity.Property(e => e.LastEditDate)
                    .HasMaxLength(50)
                    .HasColumnName("lastEditDate")
                    .HasComment("Fecha de modificación");

                entity.Property(e => e.Location)
                    .HasMaxLength(200)
                    .HasColumnName("location")
                    .HasComment("Municipio PAA y Departamento PAA");

                entity.Property(e => e.Modality)
                    .HasColumnName("modality")
                    .HasComment("Modalidad");

                entity.Property(e => e.Uid)
                    .HasColumnName("uid")
                    .HasComment("identificador_unico_paa detalle");

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasColumnName("uploadDate")
                    .HasDefaultValueSql("([dbo].[ReturnTimeZoneDate](getutcdate()))");

                entity.Property(e => e.Year)
                    .HasMaxLength(4)
                    .HasColumnName("year")
                    .HasComment("Año del Plan de adquisición");
            });

            modelBuilder.Entity<AcquisitionPlansCompanyOffer>(entity =>
            {
                entity.HasKey(e => e.IdAcquisitionPlansCompanyOffers)
                    .HasName("PK__Acquisit__B71FDC98E4CEA9CC");

                entity.Property(e => e.IdAcquisitionPlansCompanyOffers).HasColumnName("idAcquisitionPlansCompanyOffers");

                entity.Property(e => e.AcquisitionValue)
                    .HasMaxLength(50)
                    .HasColumnName("acquisitionValue")
                    .HasComment("Valor adquisición");

                entity.Property(e => e.CategoriesCodes)
                    .HasColumnName("categoriesCodes")
                    .HasComment("Código UNSPSC");

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .HasColumnName("city")
                    .HasComment("Municipio en el que se encuentra registrada la entidad estatal compradora");

                entity.Property(e => e.ContactEmail)
                    .HasMaxLength(300)
                    .HasColumnName("contactEmail")
                    .HasComment("Email contacto");

                entity.Property(e => e.ContactInfo)
                    .HasMaxLength(300)
                    .HasColumnName("contactInfo")
                    .HasComment("Nombre contacto");

                entity.Property(e => e.ContactPhone)
                    .HasMaxLength(300)
                    .HasColumnName("contactPhone")
                    .HasComment("Teléfono contacto");

                entity.Property(e => e.CreatedDate)
                    .HasMaxLength(50)
                    .HasColumnName("createdDate")
                    .HasComment("Fecha de creación");

                entity.Property(e => e.Department)
                    .HasMaxLength(100)
                    .HasColumnName("department")
                    .HasComment("Departamento en el que se encuentra registrada la entidad estatal compradora");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasComment("Descripción");

                entity.Property(e => e.EntityName)
                    .HasColumnName("entityName")
                    .HasComment("Nombre de la Entidad del estado a la que corresponde el proceso");

                entity.Property(e => e.IdCompanyProfile).HasColumnName("idCompanyProfile");

                entity.Property(e => e.IdPaa)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("idPaa");

                entity.Property(e => e.InitDate)
                    .HasMaxLength(300)
                    .HasColumnName("initDate")
                    .HasComment("Fecha inicio Proceso de Contratación");

                entity.Property(e => e.IsSecopOne)
                    .HasColumnName("isSecopOne")
                    .HasComment("Es secop I o No (1=Si, 0=No)");

                entity.Property(e => e.LastEditDate)
                    .HasMaxLength(50)
                    .HasColumnName("lastEditDate")
                    .HasComment("Fecha de modificación");

                entity.Property(e => e.Location)
                    .HasMaxLength(100)
                    .HasColumnName("location")
                    .HasComment("Municipio PAA y Departamento PAA");

                entity.Property(e => e.Modality)
                    .HasColumnName("modality")
                    .HasComment("Modalidad");

                entity.Property(e => e.Uid)
                    .HasColumnName("uid")
                    .HasComment("identificador_unico_paa detalle");

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasColumnName("uploadDate")
                    .HasDefaultValueSql("([dbo].[ReturnTimeZoneDate](getutcdate()))");

                entity.Property(e => e.Year)
                    .HasMaxLength(4)
                    .HasColumnName("year")
                    .HasComment("Año del Plan de adquisición");

                entity.HasOne(d => d.IdCompanyProfileNavigation)
                    .WithMany(p => p.AcquisitionPlansCompanyOffers)
                    .HasForeignKey(d => d.IdCompanyProfile)
                    .HasConstraintName("FK_OfferAcq_CompanyProfile");
            });

            modelBuilder.Entity<Audit>(entity =>
            {
                entity.HasKey(e => e.IdAudit)
                    .HasName("PK__Audit__A0E9FA080238AE39");

                entity.ToTable("Audit");

                entity.Property(e => e.IdAudit).HasColumnName("idAudit");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.IdAction).HasColumnName("idAction");

                entity.Property(e => e.IdMessageResponse).HasColumnName("idMessageResponse");

                entity.Property(e => e.IdUser).HasColumnName("idUser");
            });

            modelBuilder.Entity<CompanyInterest>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterest);

                entity.ToTable("CompanyInterest");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.Property(e => e.AllDepartements).HasColumnName("allDepartements");

                entity.Property(e => e.AllMode).HasColumnName("allMode");

                entity.Property(e => e.AllMunicipalities).HasColumnName("allMunicipalities");

                entity.Property(e => e.AllStage).HasColumnName("allStage");

                entity.Property(e => e.AllValues).HasColumnName("allValues");

                entity.Property(e => e.Companies)
                    .IsUnicode(false)
                    .HasColumnName("companies");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate");

                entity.Property(e => e.IdCompanyProfile).HasColumnName("idCompanyProfile");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IdUserCreate).HasColumnName("idUserCreate");

                entity.Property(e => e.IdUserUpdate).HasColumnName("idUserUpdate");

                entity.Property(e => e.IncludeValues).HasColumnName("includeValues");

                entity.Property(e => e.InterestType)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("interestType");

                entity.Property(e => e.MaximumValues).HasColumnName("maximumValues");

                entity.Property(e => e.MinimumValues).HasColumnName("minimumValues");

                entity.HasOne(d => d.IdCompanyProfileNavigation)
                    .WithMany(p => p.CompanyInterests)
                    .HasForeignKey(d => d.IdCompanyProfile)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterest_CompanyProfile");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.CompanyInterests)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterest_State");
            });

            modelBuilder.Entity<CompanyInterestDepartment>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterestDepartment);

                entity.ToTable("CompanyInterestDepartment");

                entity.Property(e => e.IdCompanyInterestDepartment).HasColumnName("idCompanyInterestDepartment");

                entity.Property(e => e.DepartmentDaneCode)
                    .IsRequired()
                    .HasMaxLength(5)
                    .HasColumnName("departmentDaneCode");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.HasOne(d => d.DepartmentDaneCodeNavigation)
                    .WithMany(p => p.CompanyInterestDepartments)
                    .HasPrincipalKey(p => p.DaneCode)
                    .HasForeignKey(d => d.DepartmentDaneCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterestDepartment_Territorialentity");

                entity.HasOne(d => d.IdCompanyInterestNavigation)
                    .WithMany(p => p.CompanyInterestDepartments)
                    .HasForeignKey(d => d.IdCompanyInterest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterestDepartment_CompanyInterest");
            });

            modelBuilder.Entity<CompanyInterestMode>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterestMode);

                entity.ToTable("CompanyInterestMode");

                entity.Property(e => e.IdCompanyInterestMode).HasColumnName("idCompanyInterestMode");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.Property(e => e.Mode).HasColumnName("mode");

                entity.HasOne(d => d.IdCompanyInterestNavigation)
                    .WithMany(p => p.CompanyInterestModes)
                    .HasForeignKey(d => d.IdCompanyInterest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterestMode_CompanyInterest");
            });

            modelBuilder.Entity<CompanyInterestMunicipality>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterestMunicipality);

                entity.ToTable("CompanyInterestMunicipality");

                entity.Property(e => e.IdCompanyInterestMunicipality).HasColumnName("idCompanyInterestMunicipality");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.Property(e => e.MunicipalityDaneCode)
                    .IsRequired()
                    .HasMaxLength(5)
                    .HasColumnName("municipalityDaneCode");

                entity.HasOne(d => d.IdCompanyInterestNavigation)
                    .WithMany(p => p.CompanyInterestMunicipalities)
                    .HasForeignKey(d => d.IdCompanyInterest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterestMunicipality_CompanyInterest");

                entity.HasOne(d => d.MunicipalityDaneCodeNavigation)
                    .WithMany(p => p.CompanyInterestMunicipalities)
                    .HasPrincipalKey(p => p.DaneCode)
                    .HasForeignKey(d => d.MunicipalityDaneCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterest_Territorialentity");
            });

            modelBuilder.Entity<CompanyInterestNotification>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterestNotification)
                    .HasName("PK_CompanyInteresNotification");

                entity.ToTable("CompanyInterestNotification");

                entity.Property(e => e.IdCompanyInterestNotification).HasColumnName("idCompanyInterestNotification");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.Property(e => e.Notification).HasColumnName("notification");

                entity.Property(e => e.NotificationFrequency)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("notificationFrequency");
            });

            modelBuilder.Entity<CompanyInterestStage>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterestStage);

                entity.ToTable("CompanyInterestStage");

                entity.Property(e => e.IdCompanyInterestStage).HasColumnName("idCompanyInterestStage");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.Property(e => e.Stage).HasColumnName("stage");

                entity.HasOne(d => d.IdCompanyInterestNavigation)
                    .WithMany(p => p.CompanyInterestStages)
                    .HasForeignKey(d => d.IdCompanyInterest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInterestStage_CompanyInterest");
            });

            modelBuilder.Entity<CompanyInterestUnspscclassifier>(entity =>
            {
                entity.HasKey(e => e.IdCompanyInterestClassifier)
                    .HasName("PK_CompanyInteresUNSPSCClassifier");

                entity.ToTable("CompanyInterestUNSPSCClassifier");

                entity.Property(e => e.IdCompanyInterestClassifier).HasColumnName("idCompanyInterestClassifier");

                entity.Property(e => e.ClassifierCode).HasColumnName("classifierCode");

                entity.Property(e => e.IdCompanyInterest).HasColumnName("idCompanyInterest");

                entity.HasOne(d => d.IdCompanyInterestNavigation)
                    .WithMany(p => p.CompanyInterestUnspscclassifiers)
                    .HasForeignKey(d => d.IdCompanyInterest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CompanyInteresUNSPSCClassifier_CompanyInterest");
            });

            modelBuilder.Entity<CompanyProfile>(entity =>
            {
                entity.ToTable("CompanyProfile");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Characterization)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("characterization");

                entity.Property(e => e.City)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("city");

                entity.Property(e => e.CommercialInformation)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("commercialInformation");

                entity.Property(e => e.CompanyId).HasColumnName("companyId");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("companyName");

                entity.Property(e => e.Country)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("country");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Idtype)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("IDType");

                entity.Property(e => e.IndustryMainSector).HasColumnName("industryMainSector");

                entity.Property(e => e.IsOwner).HasColumnName("isOwner");

                entity.Property(e => e.MicroBusiness).HasColumnName("microBusiness");

                entity.Property(e => e.NumberId)
                    .HasMaxLength(50)
                    .HasColumnName("numberId");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("phoneNumber");
            });

            modelBuilder.Entity<CpCiiuUnspscClnCorrelative>(entity =>
            {
                entity.HasKey(e => e.IdCorrelative);

                entity.ToTable("CP-CIIU-UNSPSC-CLN-Correlative");

                entity.HasComment("Tabla que registra los componente  que serán utilizados en el home de la aplicación.");

                entity.Property(e => e.IdCorrelative)
                    .HasColumnName("idCorrelative")
                    .HasComment("Identificador del registro de una correlativa");

                entity.Property(e => e.Ciiucode)
                    .HasColumnName("CIIUCode")
                    .HasComment("Código CIIU, según la clasificación uniforme de las actividades económicas por procesos productivos");

                entity.Property(e => e.Ciiudescription)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("CIIUDescription")
                    .HasComment("Descripción del código CIIU, según la clasificación uniforme de las actividades económicas por procesos productivos");

                entity.Property(e => e.Clnsector)
                    .HasColumnName("CLNSector")
                    .HasComment("Código de identificación del sector de CLN");

                entity.Property(e => e.ClnsectorEn)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("CLNSectorEN")
                    .HasComment("Sector según la clasificación de CLN en inglés");

                entity.Property(e => e.ClnsectorEs)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("CLNSectorES")
                    .HasComment("Sector según la clasificación de CLN en español");

                entity.Property(e => e.Cpsector)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("CPSector")
                    .HasComment("Sector según la clasificación de Colombia Productiva");

                entity.Property(e => e.Cpsubsector)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("CPSubsector")
                    .HasComment("Subsector según la clasificación de Colombia Productiva");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("([dbo].[ReturnTimeZoneDate](getutcdate()))")
                    .HasComment("Fecha en la que se creó el componente");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del componente");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasDefaultValueSql("((1))")
                    .HasComment("Identificador del estado de un componente");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el componente");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el componente");

                entity.Property(e => e.UnspscproductCode)
                    .HasColumnName("UNSPSCProductCode")
                    .HasComment("Código Producto según la clasificación de las Naciones Unidas");

                entity.Property(e => e.UnspscproductName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("UNSPSCProductName")
                    .HasComment("Nombre del producto según la clasificación de las Naciones Unidas");

                entity.Property(e => e.UploadedFileName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("uploadedFileName");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.CpCiiuUnspscClnCorrelatives)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CP-CIIU-UNSPSC-CLN-Correlative_State");
            });

            modelBuilder.Entity<Domain>(entity =>
            {
                entity.HasKey(e => e.IdDomain)
                    .HasName("PK__Domain__7D7807E831BC0523");

                entity.ToTable("Domain");

                entity.Property(e => e.IdDomain).HasColumnName("idDomain");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate");

                entity.Property(e => e.Enumerator).HasColumnName("enumerator");

                entity.Property(e => e.IdDomainType).HasColumnName("idDomainType");

                entity.Property(e => e.IdUserCreate).HasColumnName("idUserCreate");

                entity.Property(e => e.IdUserUpdate).HasColumnName("idUserUpdate");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IsSystemDomain)
                    .HasColumnName("isSystemDomain")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Translation)
                    .HasMaxLength(255)
                    .HasColumnName("translation");

                entity.Property(e => e.Value)
                    .HasColumnType("decimal(18, 3)")
                    .HasColumnName("value");

                entity.HasOne(d => d.IdDomainTypeNavigation)
                    .WithMany(p => p.Domains)
                    .HasForeignKey(d => d.IdDomainType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Domain__idDomain__6AEFE058");
            });

            modelBuilder.Entity<DomainType>(entity =>
            {
                entity.HasKey(e => e.Enumerator)
                    .HasName("PK__DomainTy__45E5F3F2BE6226E7");

                entity.ToTable("DomainType");

                entity.Property(e => e.Enumerator)
                    .ValueGeneratedNever()
                    .HasColumnName("enumerator");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate");

                entity.Property(e => e.IdDomainType)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idDomainType");

                entity.Property(e => e.IdUserCreate).HasColumnName("idUserCreate");

                entity.Property(e => e.IdUserUpdate).HasColumnName("idUserUpdate");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Translation)
                    .HasMaxLength(255)
                    .HasColumnName("translation");
            });

            modelBuilder.Entity<EmailSending>(entity =>
            {
                entity.HasKey(e => e.IdEmailSending);

                entity.ToTable("EmailSending");

                entity.HasComment("Tabla que registra los diferentes envíos de correo de un evento privado. ");

                entity.Property(e => e.IdEmailSending)
                    .HasColumnName("idEmailSending")
                    .HasComment("Identificador del registro de un envío de correo");

                entity.Property(e => e.Attempts)
                    .HasColumnName("attempts")
                    .HasComment("Cantidad de veces que se intentó realizar el envío de correo");

                entity.Property(e => e.Cc)
                    .IsUnicode(false)
                    .HasColumnName("cc")
                    .HasComment("Correos electrónicos copia al los cuales se les envió el email");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasComment("Fecha en la que se creó el rol");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del rol");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasComment("Cuerpo del correo");

                entity.Property(e => e.EmailDate)
                    .HasColumnType("datetime")
                    .HasColumnName("emailDate")
                    .HasComment("Fecha de la creación de la notificación");

                entity.Property(e => e.EmailSendingDate)
                    .HasColumnType("datetime")
                    .HasColumnName("emailSendingDate")
                    .HasComment("Fecha del envío del correo");

                entity.Property(e => e.From)
                    .IsRequired()
                    .HasColumnName("from")
                    .HasComment("Remitente del correo");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el rol");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el rol");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("subject")
                    .HasComment("Asunto del correo");

                entity.Property(e => e.Success)
                    .HasColumnName("success")
                    .HasComment("Identifica si el correo fue enviado correctamente");

                entity.Property(e => e.To)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("to")
                    .HasComment("Correos electrónicos al los cuales se les envió el email");
            });

            modelBuilder.Entity<FormatHtml>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("formatHtml");

                entity.Property(e => e.Enumerator)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("enumerator");

                entity.Property(e => e.Html)
                    .IsRequired()
                    .HasColumnName("html");

                entity.Property(e => e.IdHtml)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idHtml");
            });

            modelBuilder.Entity<HiringProcess>(entity =>
            {
                entity.HasKey(e => e.IdHiringProcess)
                    .HasName("PK__HiringPr__52CD56BF266EB323");

                entity.ToTable("HiringProcess");

                entity.Property(e => e.IdHiringProcess).HasColumnName("idHiringProcess");

                entity.Property(e => e.AdditionalCategories).HasColumnName("additionalCategories");

                entity.Property(e => e.BasePrice).HasColumnName("basePrice");

                entity.Property(e => e.CertificateNumber).HasColumnName("certificateNumber");

                entity.Property(e => e.City).HasColumnName("city");

                entity.Property(e => e.ContractingModality).HasColumnName("contractingModality");

                entity.Property(e => e.DateLoadSecop)
                    .HasColumnType("datetime")
                    .HasColumnName("dateLoadSecop");

                entity.Property(e => e.DateReceiptResponses)
                    .HasColumnType("datetime")
                    .HasColumnName("dateReceiptResponses");

                entity.Property(e => e.Department).HasColumnName("department");

                entity.Property(e => e.DetailObjectToHired).HasColumnName("detailObjectToHired");

                entity.Property(e => e.Duration).HasColumnName("duration");

                entity.Property(e => e.EntityName).HasColumnName("entityName");

                entity.Property(e => e.IsSecopOne).HasColumnName("isSecopOne");

                entity.Property(e => e.LastPublicationDate)
                    .HasColumnType("datetime")
                    .HasColumnName("lastPublicationDate");

                entity.Property(e => e.MainCategoryCode).HasColumnName("mainCategoryCode");

                entity.Property(e => e.Phase).HasColumnName("phase");

                entity.Property(e => e.ProcessNumber).HasColumnName("processNumber");

                entity.Property(e => e.StateProcess).HasColumnName("stateProcess");

                entity.Property(e => e.TypeContract).HasColumnName("typeContract");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.UnitDuration).HasColumnName("unitDuration");

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasColumnName("uploadDate")
                    .HasDefaultValueSql("([dbo].[ReturnTimeZoneDate](getutcdate()))");

                entity.Property(e => e.UrlProcess).HasColumnName("urlProcess");
            });

            modelBuilder.Entity<HiringProcessCompanyOffer>(entity =>
            {
                entity.HasKey(e => e.IdHiringProcessCompanyOffers)
                    .HasName("PK__HiringPr__DBBD9108990CF95D");

                entity.Property(e => e.IdHiringProcessCompanyOffers).HasColumnName("idHiringProcessCompanyOffers");

                entity.Property(e => e.AdditionalCategories).HasColumnName("additionalCategories");

                entity.Property(e => e.BasePrice)
                    .HasColumnName("basePrice")
                    .HasComment("Valor por el cual se lanza el proceso de compra");

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasComment("Municipio en el que se encuentra registrada la entidad estatal compradora");

                entity.Property(e => e.ContractingModality)
                    .HasColumnName("contractingModality")
                    .HasComment("El ID y Tipo de Proceso describen la modalidad a través de la cual se desarrolló el proceso de compra");

                entity.Property(e => e.DateLoadSecop)
                    .HasColumnType("datetime")
                    .HasColumnName("dateLoadSecop")
                    .HasComment("Fecha en la que se hizo el registro en la plataforma");

                entity.Property(e => e.DateReceiptResponses)
                    .HasColumnType("datetime")
                    .HasColumnName("dateReceiptResponses");

                entity.Property(e => e.Department)
                    .HasColumnName("department")
                    .HasComment("Departamento en el que se encuentra registrada la entidad estatal compradora");

                entity.Property(e => e.DetailObjectToHired)
                    .HasColumnName("detailObjectToHired")
                    .HasComment("Adicional al código que define el objeto del contrato, se registra un detalle de la definición del bien o servicio que se adquirirá dentro del proceso");

                entity.Property(e => e.Duration)
                    .HasColumnName("duration")
                    .HasComment("Valor y unidad en la que se mide el tiempo de ejecución del contrato, sean días o meses");

                entity.Property(e => e.EntityName)
                    .HasColumnName("entityName")
                    .HasComment("Nombre de la Entidad del estado a la que corresponde el proceso");

                entity.Property(e => e.IdCompanyProfile)
                    .HasColumnName("idCompanyProfile")
                    .HasComment("ID de la empresa interesada");

                entity.Property(e => e.IsSecopOne).HasColumnName("isSecopOne");

                entity.Property(e => e.LastPublicationDate)
                    .HasColumnType("datetime")
                    .HasColumnName("lastPublicationDate");

                entity.Property(e => e.MainCategoryCode)
                    .HasColumnName("mainCategoryCode")
                    .HasComment("Tercer nivel de detalle dentro de la caracterización del bien o servicio");

                entity.Property(e => e.Phase)
                    .HasColumnName("phase")
                    .HasComment("Fase");

                entity.Property(e => e.ProcessNumber)
                    .HasColumnName("processNumber")
                    .HasComment("dentificador del proceso, de acuerdo a la nomenclatura de la entidad");

                entity.Property(e => e.TypeContract)
                    .HasColumnName("typeContract")
                    .HasComment("Tipo de Contrato que se realizará, ejemplos: Fiducia, Obra, entre otros.");

                entity.Property(e => e.Uid)
                    .HasColumnName("uid")
                    .HasComment("Valor compuesto para identificar de manera individual cada registro");

                entity.Property(e => e.UnitDuration)
                    .HasColumnName("unitDuration")
                    .HasComment("Valor y unidad en la que se mide el tiempo de ejecución del contrato, sean días o meses");

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasColumnName("uploadDate")
                    .HasDefaultValueSql("([dbo].[ReturnTimeZoneDate](getutcdate()))")
                    .HasComment("Fecha de cargue");

                entity.Property(e => e.UrlProcess)
                    .HasColumnName("urlProcess")
                    .HasComment("Ruta del proceso de compra en SECOP, para hacer consulta de la información detallada ");

                entity.HasOne(d => d.IdCompanyProfileNavigation)
                    .WithMany(p => p.HiringProcessCompanyOffers)
                    .HasForeignKey(d => d.IdCompanyProfile)
                    .HasConstraintName("FK_Offer_CompanyProfile");
            });

            modelBuilder.Entity<HomeComponent>(entity =>
            {
                entity.HasKey(e => e.IdHomeComponent);

                entity.ToTable("HomeComponent");

                entity.HasComment("Tabla que registra los componente  que serán utilizados en el home de la aplicación.");

                entity.Property(e => e.IdHomeComponent)
                    .HasColumnName("idHomeComponent")
                    .HasComment("Identificador del registro de un componente");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasComment("Fecha en la que se creó el componente");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del componente");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasComment("Identificador del estado de un componente");

                entity.Property(e => e.IdTemplate)
                    .HasColumnName("idTemplate")
                    .HasComment("Identificador de la plantilla que utiliza un componente");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el componente");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el componente");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name")
                    .HasComment("Nombre del componente");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.HomeComponents)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HomeComponent_State");

                entity.HasOne(d => d.IdTemplateNavigation)
                    .WithMany(p => p.HomeComponents)
                    .HasForeignKey(d => d.IdTemplate)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HomeComponent_Template");
            });

            modelBuilder.Entity<HomeComponentAttribute>(entity =>
            {
                entity.HasKey(e => e.IdHomeComponentAttribute);

                entity.ToTable("HomeComponentAttribute");

                entity.HasComment("Tabla que registra los diferentes atributos que seraán utilizados por los componentes del home de la aplicación.");

                entity.Property(e => e.IdHomeComponentAttribute)
                    .HasColumnName("idHomeComponentAttribute")
                    .HasComment("Identificador del registro de un atributo");

                entity.Property(e => e.IdHomeComponent)
                    .HasColumnName("idHomeComponent")
                    .HasComment("Identificador del componente que pertenece el atributo");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("name")
                    .HasComment("Nombre del atributo");

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasComment("Valor o contenido de un atributo");

                entity.HasOne(d => d.IdHomeComponentNavigation)
                    .WithMany(p => p.HomeComponentAttributes)
                    .HasForeignKey(d => d.IdHomeComponent)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HomeComponentAttribute_HomeComponent");
            });

            modelBuilder.Entity<MailDiario>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("mailDiario");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FechaPublicacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha Publicacion");

                entity.Property(e => e.Frecuencia)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IdCompany).HasColumnName("idCompany");

                entity.Property(e => e.IdProceso).HasColumnName("idProceso");

                entity.Property(e => e.Modalidad).IsRequired();

                entity.Property(e => e.Notificacion).IsRequired();

                entity.Property(e => e.ObjetoAContratar).HasColumnName("Objeto a Contratar");

                entity.Property(e => e.Tipo).HasColumnName("TIPO");
            });

            modelBuilder.Entity<MailMensual>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("mailMensual");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FechaPublicacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha Publicacion");

                entity.Property(e => e.Frecuencia)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IdCompany).HasColumnName("idCompany");

                entity.Property(e => e.IdProceso).HasColumnName("idProceso");

                entity.Property(e => e.Modalidad).IsRequired();

                entity.Property(e => e.Notificacion).IsRequired();

                entity.Property(e => e.ObjetoAContratar).HasColumnName("Objeto a Contratar");

                entity.Property(e => e.Tipo).HasColumnName("TIPO");
            });

            modelBuilder.Entity<MailSemanal>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("mailSemanal");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FechaPublicacion)
                    .HasColumnType("datetime")
                    .HasColumnName("Fecha Publicacion");

                entity.Property(e => e.Frecuencia)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IdCompany).HasColumnName("idCompany");

                entity.Property(e => e.IdProceso).HasColumnName("idProceso");

                entity.Property(e => e.Modalidad).IsRequired();

                entity.Property(e => e.Notificacion).IsRequired();

                entity.Property(e => e.ObjetoAContratar).HasColumnName("Objeto a Contratar");

                entity.Property(e => e.Tipo).HasColumnName("TIPO");
            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.IdMenu);

                entity.ToTable("Menu");

                entity.HasComment("Tabla que registra los menues que serán utilizados en la aplicación.");

                entity.Property(e => e.IdMenu)
                    .HasColumnName("idMenu")
                    .HasComment("Identificador del registro de un menú");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))")
                    .HasComment("Fecha en la que se creó el menú");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha en la última edición del menú");

                entity.Property(e => e.IdFatherMenu)
                    .HasColumnName("idFatherMenu")
                    .HasComment("Identificador del menú principal que pertenece (si aplica)");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasComment("Identificador del estado de un menú");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el menú");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el menú");

                entity.Property(e => e.Logo)
                    .HasMaxLength(500)
                    .HasColumnName("logo")
                    .HasComment("Path donde se encuentra el logo del meno");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name")
                    .HasComment("Nombre del menú");

                entity.Property(e => e.Tooltip)
                    .HasMaxLength(500)
                    .HasColumnName("tooltip")
                    .HasComment("tooltip del menu");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("url")
                    .HasComment("Path donde se redireccionaría el usuario cuando presione el menú");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.Menus)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Menu_State");
            });

            modelBuilder.Entity<MenuRol>(entity =>
            {
                entity.HasKey(e => e.IdMenuRol);

                entity.ToTable("MenuRol");

                entity.HasComment("Tabla que registra la relación de un menú con diferentes roles. ");

                entity.Property(e => e.IdMenuRol)
                    .HasColumnName("idMenuRol")
                    .HasComment("Identificador del registro de la relacion menu rol");

                entity.Property(e => e.IdMenu)
                    .HasColumnName("idMenu")
                    .HasComment("Identificador del registro de un menú");

                entity.Property(e => e.IdRol)
                    .HasColumnName("idRol")
                    .HasComment("Identificador del registro de un rol");

                entity.Property(e => e.Orden).HasColumnName("orden");

                entity.HasOne(d => d.IdMenuNavigation)
                    .WithMany(p => p.MenuRols)
                    .HasForeignKey(d => d.IdMenu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MenuRol_Menu");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.MenuRols)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MenuRol_Rol");
            });

            modelBuilder.Entity<MenuRolPermit>(entity =>
            {
                entity.HasKey(e => e.IdMenuRolPermit);

                entity.ToTable("MenuRolPermit");

                entity.HasComment("Tabla que registra la relación de un rol con permisos asociados de un menu.");

                entity.Property(e => e.IdMenuRolPermit)
                    .HasColumnName("idMenuRolPermit")
                    .HasComment("Identificador del registro de la relacion rol permiso");

                entity.Property(e => e.IdMenu)
                    .HasColumnName("idMenu")
                    .HasComment("Identificador del registro de un menu");

                entity.Property(e => e.IdPermit)
                    .HasColumnName("idPermit")
                    .HasComment("Identificador del registro de un permiso");

                entity.Property(e => e.IdRol)
                    .HasColumnName("idRol")
                    .HasComment("Identificador del registro de un rol");

                entity.HasOne(d => d.IdMenuNavigation)
                    .WithMany(p => p.MenuRolPermits)
                    .HasForeignKey(d => d.IdMenu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MenuRolPermit_Menu");

                entity.HasOne(d => d.IdPermitNavigation)
                    .WithMany(p => p.MenuRolPermits)
                    .HasForeignKey(d => d.IdPermit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MenuRolPermit_Permit");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.MenuRolPermits)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MenuRolPermit_Rol");
            });

            modelBuilder.Entity<MessageResponse>(entity =>
            {
                entity.HasKey(e => e.IdMessageResponse)
                    .HasName("PK__MessageR__8B69D6EE5BD0D0AA");

                entity.ToTable("MessageResponse");

                entity.Property(e => e.IdMessageResponse).HasColumnName("idMessageResponse");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(3)
                    .HasColumnName("code");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate");

                entity.Property(e => e.IdUserCreate).HasColumnName("idUserCreate");

                entity.Property(e => e.IdUserUpdate).HasColumnName("idUserUpdate");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message");
            });

            modelBuilder.Entity<Permit>(entity =>
            {
                entity.HasKey(e => e.IdPermit);

                entity.ToTable("Permit");

                entity.HasComment("Tabla que registra los diferentes permisos que serán utilizadas en la aplicación. ");

                entity.Property(e => e.IdPermit)
                    .HasColumnName("idPermit")
                    .HasComment("Identificador del registro de un permiso");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))")
                    .HasComment("Fecha en la que se creó el permiso");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha en la última edición de un permiso");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasComment("Identificador del estado de un permiso");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el permiso");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el permiso");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name")
                    .HasComment("Nombre del permiso");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.Permits)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Permit_State");
            });

            modelBuilder.Entity<ProcesoxMail>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProcesoxMail");

                entity.Property(e => e.CompanyId)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("companyId");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.IdEmailSending)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("idEmailSending");

                entity.Property(e => e.IdHiringProcessCompanyOffers)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("idHiringProcessCompanyOffers");

                entity.Property(e => e.IdProcesoxMail)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idProcesoxMail");
            });

            modelBuilder.Entity<ProcessLog>(entity =>
            {
                entity.HasKey(e => e.IdProcessLog);

                entity.ToTable("ProcessLog");

                entity.HasComment("Tabla que registra los diferentes procesos y sus resultados que se realizan en la aplicación");

                entity.Property(e => e.IdProcessLog)
                    .HasColumnName("idProcessLog")
                    .HasComment("Identificador del registro de log de un proceso");

                entity.Property(e => e.Attempts)
                    .HasColumnName("attempts")
                    .HasComment("Cantidad de veces que se intentó realizar el envío de correo");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasComment("Fecha en la que se creó el registro del proceso");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del registro del proceso");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que lanzó el proceso");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el registro del proceso");

                entity.Property(e => e.Ip)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("ip")
                    .HasComment("Id desde la cual se lanzó el proceso");

                entity.Property(e => e.Process)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("process")
                    .HasComment("Nombre del proceso");

                entity.Property(e => e.ProcessResult)
                    .HasColumnName("processResult")
                    .HasComment("Resultado del proceso. Es un json que contiene el resultado de un servicio externo si lo tiene y el resultado del proceso como tal.");

                entity.Property(e => e.ProcessStartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("processStartDate")
                    .HasComment("Fecha de inicio del proceso");

                entity.Property(e => e.ProcesseEndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("processeEndDate")
                    .HasComment("Fecha de final del proceso");

                entity.Property(e => e.Success)
                    .HasColumnName("success")
                    .HasComment("Indica si el proceso salio exitoso");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.IdRol);

                entity.ToTable("Rol");

                entity.HasComment("Tabla que registra los roles que serán utilizados en la aplicación.");

                entity.Property(e => e.IdRol)
                    .HasColumnName("idRol")
                    .HasComment("Identificador del registro de un rol");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))")
                    .HasComment("Fecha en la que se creó el rol");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del rol");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .HasColumnName("description")
                    .HasComment("Descripción del rol");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasComment("Identificador del estado de un rol");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el rol");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el rol");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name")
                    .HasComment("Nombre del rol");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.Rols)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rol_State");
            });

            modelBuilder.Entity<RolPermit>(entity =>
            {
                entity.HasKey(e => e.IdRolPermit)
                    .HasName("PK_[RolPermit");

                entity.ToTable("RolPermit");

                entity.HasComment("Tabla que registra la relación de un rol con permisos asociados.");

                entity.Property(e => e.IdRolPermit)
                    .HasColumnName("idRolPermit")
                    .HasComment("Identificador del registro de la relacion rol permiso");

                entity.Property(e => e.IdPermit)
                    .HasColumnName("idPermit")
                    .HasComment("Identificador del registro de un permiso");

                entity.Property(e => e.IdRol)
                    .HasColumnName("idRol")
                    .HasComment("Identificador del registro de un rol");

                entity.HasOne(d => d.IdPermitNavigation)
                    .WithMany(p => p.RolPermits)
                    .HasForeignKey(d => d.IdPermit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolPermit_Permit");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.RolPermits)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolPermit_Rol");
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.HasKey(e => e.IdState);

                entity.ToTable("State");

                entity.HasComment("Tabla que registra los diferentes estados que existen en la aplicación.");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasComment("Identificador del registro de un estado");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))")
                    .HasComment("Fecha en la que se creó el rol");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del rol");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el rol");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el rol");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name")
                    .HasComment("Nombre del estado");
            });

            modelBuilder.Entity<Template>(entity =>
            {
                entity.HasKey(e => e.IdTemplate);

                entity.ToTable("Template");

                entity.Property(e => e.IdTemplate).HasColumnName("idTemplate");

                entity.Property(e => e.Body)
                    .IsRequired()
                    .HasColumnName("body");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate");

                entity.Property(e => e.Enumerator).HasColumnName("enumerator");

                entity.Property(e => e.IdDomainType).HasColumnName("idDomainType");

                entity.Property(e => e.IdState).HasColumnName("idState");

                entity.Property(e => e.IdUserCreate).HasColumnName("idUserCreate");

                entity.Property(e => e.IdUserUpdate).HasColumnName("idUserUpdate");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("subject");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.Templates)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Template_State");
            });

            modelBuilder.Entity<TerritorialEntity>(entity =>
            {
                entity.HasKey(e => e.IdTerritorialEntity);

                entity.ToTable("TerritorialEntity");

                entity.HasIndex(e => e.DaneCode, "uk_TerritorialEntity_DaneCode")
                    .IsUnique();

                entity.Property(e => e.DaneCode)
                    .IsRequired()
                    .HasMaxLength(5);

                entity.Property(e => e.DaneCodeFather).HasMaxLength(5);

                entity.Property(e => e.TerritorialEntity1)
                    .IsRequired()
                    .HasMaxLength(80)
                    .HasColumnName("TerritorialEntity");
            });

            modelBuilder.Entity<Testmail>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("testmail");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("id");

                entity.Property(e => e.Mail)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("mail");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<UnspscClassifier>(entity =>
            {
                entity.HasKey(e => e.IdClassifier);

                entity.ToTable("UNSPSC-Classifier");

                entity.HasComment("Tabla que registra el Clasificador de bienes y servicios");

                entity.Property(e => e.IdClassifier)
                    .HasColumnName("idClassifier")
                    .HasComment("Identificador del registro de una correlativa");

                entity.Property(e => e.ClassCode)
                    .HasColumnName("classCode")
                    .HasComment("Código de la clase");

                entity.Property(e => e.ClassName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("className")
                    .HasComment("Nombre de la clase");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("([dbo].[ReturnTimeZoneDate](getutcdate()))")
                    .HasComment("Fecha en la que se creó el componente");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate")
                    .HasComment("Fecha de la última edición del componente");

                entity.Property(e => e.FamilyCode)
                    .HasColumnName("familyCode")
                    .HasComment("Código de la familia");

                entity.Property(e => e.FamilyName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("familyName")
                    .HasComment("Nombre de la familia");

                entity.Property(e => e.IdState)
                    .HasColumnName("idState")
                    .HasDefaultValueSql("((1))")
                    .HasComment("Identificador del estado de un componente");

                entity.Property(e => e.IdUserCreate)
                    .HasColumnName("idUserCreate")
                    .HasComment("Identificador del usuario que creó el componente");

                entity.Property(e => e.IdUserUpdate)
                    .HasColumnName("idUserUpdate")
                    .HasComment("Identificador del último usuario que modificó el componente");

                entity.Property(e => e.ProductCode)
                    .HasColumnName("productCode")
                    .HasComment("Código Producto según la clasificación de las Naciones Unidas");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("productName")
                    .HasComment("Nombre del producto según la clasificación de las Naciones Unidas.");

                entity.Property(e => e.SegmentCode)
                    .HasColumnName("segmentCode")
                    .HasComment("Código del segmento");

                entity.Property(e => e.SegmentName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("segmentName")
                    .HasComment("Nombre del segmento");

                entity.Property(e => e.UploadedFileName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("uploadedFileName");

                entity.Property(e => e.ValueGeneration)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("valueGeneration")
                    .HasComment("Clasificación de generación de valor");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.UnspscClassifiers)
                    .HasForeignKey(d => d.IdState)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UNSPSC-Classifier_State");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__Usuario__5B65BF97D996726C");

                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "UQ__User__AB6E61641A81D221")
                    .IsUnique();












                entity.Property(e => e.IdUser)
                    .HasColumnName("idUser")
                    .ValueGeneratedOnAdd();



                entity.Property(e => e.DateChangePassword)
                    .HasColumnType("datetime")
                    .HasColumnName("dateChangePassword");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate")
                    .HasDefaultValueSql("(dateadd(hour,(-5),getdate()))");

                entity.Property(e => e.DateExpired)
                    .HasColumnType("datetime")
                    .HasColumnName("dateExpired");

                entity.Property(e => e.DateLastLogin)
                    .HasColumnType("datetime")
                    .HasColumnName("dateLastLogin");

                entity.Property(e => e.DateUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateUpdate");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("email");

                #region CAS section

                entity.HasIndex(e => e.CasId).IsUnique();

                entity.Property(e => e.Companies)
                    .HasColumnName("companies");

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .HasColumnName("userName");

                entity.Property(e => e.Country)
                    .HasMaxLength(50)
                    .HasColumnName("country");

                entity.Property(e => e.CasId)
                    .HasColumnName("casId");

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(3)
                    .HasColumnName("countryCode");


                #endregion


                entity.Property(e => e.FailedAttempts)
                    .HasColumnName("failedAttempts")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("firstName");

                entity.Property(e => e.FirstSurname)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("firstSurname");

                entity.Property(e => e.IdRol).HasColumnName("idRol");

                entity.Property(e => e.IdUserCreate).HasColumnName("idUserCreate");

                entity.Property(e => e.IdUserUpdate).HasColumnName("idUserUpdate");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IsChangePassword)
                    .IsRequired()
                    .HasColumnName("isChangePassword")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IsLocked).HasColumnName("isLocked");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("password");

                entity.Property(e => e.SecondName)
                    .HasMaxLength(256)
                    .HasColumnName("secondName");

                entity.Property(e => e.SecondSurname)
                    .HasMaxLength(256)
                    .HasColumnName("secondSurname");




            });

            modelBuilder.Entity<UserCompanyProfile>(entity =>
            {
                entity.HasKey(e => e.IdUserCompanyProfile);

                entity.ToTable("UserCompanyProfile");

                entity.Property(e => e.IdUserCompanyProfile).HasColumnName("idUserCompanyProfile");

                entity.Property(e => e.IdCompanyProfile).HasColumnName("idCompanyProfile");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.HasOne(d => d.IdCompanyProfileNavigation)
                    .WithMany(p => p.UserCompanyProfiles)
                    .HasForeignKey(d => d.IdCompanyProfile)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserCompanyProfile_CompanyProfile");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.UserCompanyProfiles)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserCompanyProfile_User");
            });

            modelBuilder.Entity<ViewAudit>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewAudit");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(3)
                    .HasColumnName("code");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("email");

                entity.Property(e => e.IdAudit).HasColumnName("idAudit");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message");

                entity.Property(e => e.NameAction)
                    .IsRequired()
                    .HasColumnName("nameAction");
            });

            modelBuilder.Entity<ViewNotificationType>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewNotificationType");

                entity.Property(e => e.Notification).IsRequired();



                entity.Property(e => e.NotificationFrequency).HasMaxLength(255);



                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });



            modelBuilder.Entity<ViewPublicHiringProcessesMode>(entity =>
            {
                entity.HasNoKey();


                entity.ToView("ViewPublicHiringProcessesMode");




                entity.Property(e => e.Mode).IsRequired();




                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });

            modelBuilder.Entity<ViewPublicHiringProcessesStage>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewPublicHiringProcessesStage");

                entity.Property(e => e.Stage).IsRequired();




                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });

            modelBuilder.Entity<ViewUnspscclassifierClass>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewUNSPSCClassifierClass");

                entity.Property(e => e.ClassCode).HasColumnName("classCode");

                entity.Property(e => e.ClassName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("className");

                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });

            modelBuilder.Entity<ViewUnspscclassifierFamily>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewUNSPSCClassifierFamily");

                entity.Property(e => e.FamilyCode).HasColumnName("familyCode");



                entity.Property(e => e.FamilyName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("familyName");

                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });


            modelBuilder.Entity<ViewUnspscclassifierProduct>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewUNSPSCClassifierProduct");

                entity.Property(e => e.ProductCode).HasColumnName("productCode");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("productName");

                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });

            modelBuilder.Entity<ViewUnspscclassifierSegment>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewUNSPSCClassifierSegment");

                entity.Property(e => e.SegmentCode).HasColumnName("segmentCode");

                entity.Property(e => e.SegmentName)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("segmentName");

                entity.Property(e => e.Tmp).HasColumnName("tmp");
            });

            //modelBuilder.Entity<SessionToken>(entity =>
            //{
            //    entity.HasKey(e => e.UserId);

            //    entity.ToTable("SessionToken");

            //    entity.Property(e => e.UserId)
            //        .ValueGeneratedNever()
            //        .HasColumnName("userId");

            //    entity.Property(e => e.Email)
            //        .HasMaxLength(100)
            //        .IsUnicode(false)
            //        .HasColumnName("email");

            //    entity.Property(e => e.Token)
            //        .IsUnicode(false)
            //        .HasColumnName("token");

            //    entity.Property(e => e.Created)
            //        .IsUnicode(false)
            //        .HasColumnName("created");
            //});

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
