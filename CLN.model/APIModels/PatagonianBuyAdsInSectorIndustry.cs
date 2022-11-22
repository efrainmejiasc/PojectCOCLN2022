using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class PatagonianBuyAdsInSectorIndustry
    {
        public int Id { get; set; }
        public string IndustryId { get; set; }
        public string Industry { get; set; }
        public int NumberAds { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int IdUserUpdate { get; set; }
        public DateTime DateUpdate { get; set; }
    }
}
