using AutoMapper;
using CLN.model.Dto.CAS;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CLN.model.CustomMappers
{
    public class CasCompanyProfileToCompanyProfileDto : ITypeConverter<UserCompanyInformationResponseDto, CompanyProfileDto>
    {
        public CompanyProfileDto Convert(UserCompanyInformationResponseDto source, CompanyProfileDto destination, ResolutionContext context)
        {
           

            if (destination == null)
                destination = new CompanyProfileDto();

            context.Items.TryGetValue(nameof(CompanyProfileDto.CompanyId), out object companyId);

            destination.CompanyId = (int)companyId;
            destination.CompanyName = source?.name ?? string.Empty;
            destination.NumberId = source?.tax_id;
            destination.Email = source?.email ?? string.Empty;
            destination.PhoneNumber = source?.phone_number ?? string.Empty;
            destination.Country = source?.country ?? string.Empty;
            destination.City = source?.city ?? string.Empty;
            destination.MicroBusiness = (source?.is_microbusiness) != null;
            destination.IDType = (source?.type) ?? string.Empty;

            destination.IndustryMainSector = source?.catalog != null ?
                source.catalog.Select(c => KeyValuePair.Create(c.industry_id, c.name)).ToArray() :
                Array.Empty<KeyValuePair<string, string>>();

            var ch = Characterization(source);
            var ci = CommercialInformation(source);

            destination.Characterization = string.Join(",", ch);
            destination.CommercialInformation = string.Join(",", ci);
            destination.Women_President = !string.IsNullOrEmpty(source.women_president) ? source.women_president : string.Empty;
            destination.Women51p = !string.IsNullOrEmpty(source.women51p) ? source.women51p : string.Empty;

            return destination;
        }

        public static List<string> Characterization(UserCompanyInformationResponseDto source)
        {
            var lCharacterization = new List<string>();

            if (!string.IsNullOrEmpty(source?.is_victim) && ((bool)source?.is_victim.Equals("1")))
                lCharacterization.Add("Victima");
            if (!string.IsNullOrEmpty(source?.is_vulnerable) && ((bool)source?.is_vulnerable.Equals("1")))
                lCharacterization.Add("Vulnerable");
            if (!string.IsNullOrEmpty(source?.is_orange) && ((bool)source?.is_orange.Equals("1")))
                lCharacterization.Add("Empresa Sector Naranja");
            if (!string.IsNullOrEmpty(source?.is_bic) && ((bool)source?.is_bic.Equals("1")))
                lCharacterization.Add("Empresa BIC");
            if ((!string.IsNullOrEmpty(source?.women51p) && ((bool)source?.women51p.Equals("1")))
                || !string.IsNullOrEmpty(source?.women_president) && ((bool)source?.women_president.Equals("1")))
                lCharacterization.Add("Género Femenino Predominante");

            return lCharacterization;
        }

        public static List<string> CommercialInformation(UserCompanyInformationResponseDto source)
        {
            var lCommercialInformation = new List<string>();

            if (!string.IsNullOrEmpty(source?.company_investments) && ((bool)source?.company_investments.Equals("1")))
                lCommercialInformation.Add("Buscando oportunidades para invertir");
            if (!string.IsNullOrEmpty(source?.company_investors) && ((bool)source?.company_investors.Equals("1")))
                lCommercialInformation.Add("Buscando inversores");
            if (!string.IsNullOrEmpty(source?.company_export) && ((bool)source?.company_export.Equals("1")))
                lCommercialInformation.Add("Exportador");
            if (!string.IsNullOrEmpty(source?.company_import) && ((bool)source?.company_import.Equals("1")))
                lCommercialInformation.Add("Importador");
            //if (!string.IsNullOrEmpty(source?.company_import_target) || !string.IsNullOrEmpty(source?.company_export_target))
            //    lCommercialInformation.Add("Interés en negocios internacionales");
            if (!string.IsNullOrEmpty(source?.company_target_countries))
                lCommercialInformation.Add("Interés en negocios internacionales");

            return lCommercialInformation;
        }
    }
}
