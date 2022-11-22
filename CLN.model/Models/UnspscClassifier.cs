using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class UnspscClassifier
    {
        public int IdClassifier { get; set; }
        public string ValueGeneration { get; set; }
        public int SegmentCode { get; set; }
        public string SegmentName { get; set; }
        public int FamilyCode { get; set; }
        public string FamilyName { get; set; }
        public int ClassCode { get; set; }
        public string ClassName { get; set; }
        public int ProductCode { get; set; }
        public string ProductName { get; set; }
        public string UploadedFileName { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual State IdStateNavigation { get; set; }
    }
}
