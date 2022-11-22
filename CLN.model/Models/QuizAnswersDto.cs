using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class QuizAnswersDto
    {
        public int Id { get; set; }
        public int IdSheduledVirtualAppointments { get; set; }
        public int IdState { get; set; }
        public DateTime DateCreate { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int IdUserUpdate { get; set; }

        public List<QuizAnswersDetail> QuizAnswersDetail { get; set; }
    }

    public class QuizAnswersDetail
    {
        public int IdDetail { get; set; }
        public int IdQuizAnswers { get; set; }
        public int IdAsk { get; set; }
        public string Ask { get; set; }
        public string Response { get; set; }
        public string Position { get; set; }
    }
}
