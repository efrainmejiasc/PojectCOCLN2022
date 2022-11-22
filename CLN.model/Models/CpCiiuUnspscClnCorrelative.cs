using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CpCiiuUnspscClnCorrelative
    {
        public int IdCorrelative { get; set; }
        public string Cpsector { get; set; }
        public string Cpsubsector { get; set; }
        public int Ciiucode { get; set; }
        public string Ciiudescription { get; set; }
        public int UnspscproductCode { get; set; }
        public string UnspscproductName { get; set; }
        public int Clnsector { get; set; }
        public string ClnsectorEn { get; set; }
        public string ClnsectorEs { get; set; }
        public string UploadedFileName { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual State IdStateNavigation { get; set; }
    }
}
