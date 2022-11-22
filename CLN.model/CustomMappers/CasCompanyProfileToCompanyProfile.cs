using AutoMapper;
using CLN.model.Dto.CAS;
using CLN.model.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CLN.model.CustomMappers
{
    public class CasCompanyProfileToCompanyProfile : ITypeConverter<UserCompanyInformationResponseDto, CompanyProfile>
    {
        public CompanyProfile Convert(UserCompanyInformationResponseDto source, CompanyProfile destination, ResolutionContext context)
        {
            if (destination == null)
                destination = new CompanyProfile();

            context.Items.TryGetValue(nameof(CompanyProfileDto.CompanyId), out object companyId);

            destination.CompanyId = (int)companyId;
            destination.CompanyName = source?.name ?? string.Empty;
            destination.NumberId = source?.tax_id;
            destination.Email = source?.email ?? string.Empty;
            destination.PhoneNumber = source?.phone_number ?? string.Empty;
            destination.Country = source?.country ?? string.Empty;
            destination.City = source?.city ?? string.Empty;
            destination.Women_President = !string.IsNullOrEmpty(source.women_president) ? source.women_president : string.Empty;
            destination.Women51p = !string.IsNullOrEmpty(source.women51p) ? source.women51p : string.Empty;

            destination.Women_President = !string.IsNullOrEmpty(source.women_president) ? source.women_president : string.Empty;
            destination.Women51p = !string.IsNullOrEmpty(source.women51p) ? source.women51p : string.Empty;

            destination.IndustryMainSector = source?.catalog != null ?
                source.catalog.Select(c => KeyValuePair.Create(c.industry_id, c.name)).ToArray() :
                Array.Empty<KeyValuePair<string, string>>();

            return destination;
        }
    }
}
