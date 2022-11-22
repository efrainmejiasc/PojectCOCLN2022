namespace CLN.model.Settings
{
    public class AppSettings
    {
        public string Dominio { get; set; }
        public string DominioFront { get; set; }
        public string MailServer { get; set; }
        public string RutaLogo { get; set; }
        public int MailPort { get; set; }
        public bool EnableSSL { get; set; }
        public string SenderName { get; set; }
        public string BccEmail { get; set; }
        public string Sender { get; set; }
        public string Password { get; set; }
        public string Secret { get; set; }
        public string ClnIssuerJwt { get; set; }
        public string ClnAudienceJwt { get; set; }
        public string DirectoryBase { get; set; }
        public string DirectoryUser { get; set; }
        public string DirectoryMultimediaHomeComponent { get; set; }
        public string DirectoryMultimediaHomeComponentPublished { get; set; }
        public string SecopTwoUrl { get; set; }
        public string SecopOneUrl { get; set; }
        public string QuerySecopOne { get; set; }
        public string QuerySecopTwo { get; set; }
        public string DirectoryMultimediaNewsTrendsComponent { get; set; }
        public string DirectoryMultimediaAlerts { get; set; }
        public string host { get; set; }
        public string hostServicios { get; set; }        
        public string DirectoryMultimediaNewsTrendsComponentPublished { get; set; }
        public string mail360from { get; set; }
        public string mail360ReplyTo { get; set; }
        public string mail360Key { get; set; }
        public string mail360Url { get; set; }
        public string mail360FromName { get; set; }
        public bool EnableSwagger { get; set; }
        public string SMS360From { get; set; }
        public string SMS360Url { get; set; }
        public string SMS360Key { get; set; }
        public string CompanyOffersUrl { get; set; }
        public string CompanyOffersEmailSubject { get; set; }
        public string CompanyOffersWeeklyDay { get; set; }
        public bool CompanyOffersMonthly { get; set; }   
        public string ApiKey { get; set; }


        #region Source_Secop_PAA
        public string SecopOnePaaHeaderUrl { get; set; }
        public string SecopOnePaaDetailUrl { get; set; }
        public string SecopTwoPaaHeaderUrl { get; set; }
        public string SecopTwoPaaDetailUrl { get; set; }
        public string QuerySecopOnePaaHeader { get; set; }
        public string QuerySecopOnePaaDetail { get; set; }
        public string QuerySecopTwoPaaHeader { get; set; }
        public string QuerySecopTwoPaaDetail { get; set; }
        #endregion

    }

}