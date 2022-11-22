using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class MessageResponse
    {
        public int IdMessageResponse { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime? DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }
    }
}
