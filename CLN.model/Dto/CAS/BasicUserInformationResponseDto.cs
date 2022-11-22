namespace CLN.model.Dto.CAS
{
    public class BasicUserInformationResponseDto
    {
        public int id { get; set; }
        public string username { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string token { get; set; }
        public string lang { get; set; }
        public string photo_url { get; set; }
        public string photo_url_thumbnail { get; set; }
        public bool has_logged_on_ca { get; set; }
    }
}
