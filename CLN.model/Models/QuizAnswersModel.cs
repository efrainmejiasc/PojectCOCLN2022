using System;
using System.Collections.Generic;

namespace CLN.model.Models
{
    public class QuizAnswersModel
    {
        public int Id { get; set; }
        public int IdSheduledVirtualAppointments { get; set; }
        public int IdState { get; set; }
        public DateTime DateCreate { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int IdUserUpdate { get; set; }

        public int IdDetail { get; set; }
        public int IdQuizAnswers { get; set; }
        public int IdAsk { get; set; }
        public string Ask { get; set; }
        public string Response { get; set; }
        public string Position { get; set; }
    }

 
}
