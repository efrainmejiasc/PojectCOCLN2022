using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class CitationFindingsFormJson
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdState { get; set; }
        public DateTime DateCreate { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int IdUserUpdate { get; set; }
        public List<CitationFindingsFormDetail> CitationFindingsFormDetail { get; set; }
        public List<CitationFindingsFormDetailResponse> CitationFindingsFormDetailResponse { get; set; }

    }

    public class CitationFindingsFormDetail
    {
        public int IdDetail { get; set; }
        public int IdCitationFindingsForm { get; set; }
        public int IdStateDetail { get; set; }
        public string Ask { get; set; }
        public bool ResponseType { get; set; }
        public bool IsToShow { get; set; }
        public bool Mandatory { get; set; }
        public bool IsConditionAsk { get; set; }
        public int IdConditionAsk { get; set; }
        public bool IsConditionResponse { get; set; }
        public int IdConditionResponse { get; set; }
        public int PositionDetail { get; set; }
    }

    public class CitationFindingsFormDetailResponse
    {
        public int IdResponse { get; set; }
        public int IdCitationFindingsFormDetail { get; set; }
        public string Response { get; set; }
        public int PositionResponse { get; set; }
        public int QuestionNumber { get; set; }
    }
}
