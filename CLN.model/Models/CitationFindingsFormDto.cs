using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class CitationFindingsFormDto
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string FirstSurName{ get; set; }
        public string Email { get; set; }
        public int IdState { get; set; }
        public List<PropertysCitationFindingsForm> PropertysCitationFindingsForm { get; set; }
    }

    public class PropertysCitationFindingsForm
    {
        public int Id { get; set; }
        public int IdState { get; set; }
        public bool IsToShow { get; set; }
        public string Name { get; set; }
        public QuestionType QuestionType { get; set; }
        public List<AnswersOption> AnswersOptions { get; set; }
        public bool IsRequiredDiligence { get; set; }
        public Condition Condition { get; set; }
    }
    public class QuestionType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Position{ get; set; }
    }

    public class AnswersOption
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int QuestionNumber { get; set; }
        public int Position{ get; set; }
    }

    public class Condition
    {
        public bool IsConditionQuestion { get; set; } 
        public bool IsConditionAnswer { get; set; }
        public int IdConditionQuestion { get; set; }   
        public int IdConditionAnswer { get; set; }

    }
}
