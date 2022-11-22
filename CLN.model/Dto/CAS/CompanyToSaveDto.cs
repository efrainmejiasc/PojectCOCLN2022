namespace CLN.model.Dto.CAS
{
    public class CompanyToSaveDto
    {
        /// <summary>
        /// Company identifier
        /// </summary>
        public int? CompanyId { get; set; }

        /// <summary>
        /// Company name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Is owner
        /// </summary>
        public bool? IsOwner { get; set; }

        /// <summary>
        /// Is company admin
        /// </summary>
        public bool? IsAdmin { get;set;}
    }
}
