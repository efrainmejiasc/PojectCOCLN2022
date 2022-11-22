using AutoMapper;
using CLN.model.APIModels;
using CLN.model.Dto.CAS;
using CLN.model.Dto.Login;
using CLN.model.ErrorMessages;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Extensions;
using CLN.services.Helpers.Constants;
using CLN.services.Interfaces;
using CLN.services.Interfaces.HttpClient;
using CLN.services.Wrappers;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    /// <inheritdoc />
    public class CASService : ICASService
    {
        private readonly ICustomCache _cache;
        private readonly ISequentialGuidGenerator _guidGenerator;
        private readonly DomainUrlSettings _domainUrl;
        private readonly LoginCacheSettings _loginCache;
        private readonly IAutenticationService _autenticationService;
        private readonly IMapper _mapper;
        private readonly ICASClientService _casClientService;
        private readonly ICommonService _commonService;
        private readonly CASUrlSettings _CASUrl;
        private string eventsExample;
        private string servicesExample;
        private string businessExample;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cache"></param>
        /// <param name="guidGenerator"></param>
        /// <param name="domainUrlOptions"></param>
        /// <param name="loginCacheOptions"></param>
        /// <param name="autenticationService"></param>
        /// <param name="mapper"></param>
        /// <param name="casClientService"></param>
        public CASService(
            ICustomCache cache,
            ISequentialGuidGenerator guidGenerator,
            IOptions<DomainUrlSettings> domainUrlOptions,
            IOptions<LoginCacheSettings> loginCacheOptions,
            IAutenticationService autenticationService,
            IMapper mapper,
            ICASClientService casClientService,
            ICommonService commonService,
            IOptions<CASUrlSettings> CASUrlOptions
            )
        {
            _cache = cache;
            _guidGenerator = guidGenerator;
            _domainUrl = domainUrlOptions.Value;
            _loginCache = loginCacheOptions.Value;
            _autenticationService = autenticationService;
            _mapper = mapper;
            _casClientService = casClientService;
            _commonService = commonService;
            _CASUrl = CASUrlOptions.Value;
            
            eventsExample = "{\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event\"}},\"_embedded\":{\"list\":[{\"country_tx\":\"Russia\",\"country\":\"Russia\",\"link\":\"http://www.summit.astra-partners.ru/index.php/english\",\"link_title\":\"EVENT BRICS+ BUSINESS SERVICES\",\"benefits\":\"  \",\"legal_information\":\"Legal Information\",\"industry\":\"Apparel, Textiles & Accessories\",\"schedule\":{\"20-06-2016\":[{\"action\":\"Programacion\",\"start\":\"12:00\",\"end\":\"20:00\",\"location\":\"Location1\"}],\"21-06-2016\":[{\"action\":\"Programacion 2\",\"start\":\"12:00\",\"end\":\"21:00\",\"location\":\"Location 2\"}]},\"id\":\"27835\",\"title\":\"BRICS+ Business Services 2016 - Global Summit\",\"init_date\":\"2016-07-12 00:00:00\",\"end_date\":\"2016-07-14 00:00:00\",\"location\":\"Moscow\",\"description\":\" \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/afiche_4.png\",\"documents\":[{\"label\":\"Concept and Program\",\"uri\":\"http://local.connectamericas.com/sites/default/files/BRICS%2B%20SUMMIT%202016.%20concept%20and%20program.pdf\"}],\"speakers\":[{\"name\":\"Speakers\",\"photo\":\"\",\"position\":\"\"}],\"supporters\":[{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/logo%20astra_0.png\",\"website\":\"http://astra-partners.ru/index.php/astra-association/astra-about-association\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/russfot_0.png\",\"website\":\"http://russoft.org/\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/kpok.png\",\"website\":\"http://summit.astra-partners.ru/index.php/english#Speakers\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/icl.png\",\"website\":\"http://summit.astra-partners.ru/index.php/english#Speakers\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/27835\"}},\"created\":\"1608299902\"},{\"country_tx\":null,\"country\":null,\"link\":null,\"link_title\":null,\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"24126\",\"title\":\"Korea LAC Virtual Week in ConnectAmericas \",\"init_date\":\"2016-06-20 00:00:00\",\"end_date\":\"2016-06-25 00:00:00\",\"location\":null,\"description\":\" \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/CA.png\",\"documents\":null,\"speakers\":null,\"supporters\":null,\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/24126\"}},\"created\":\"1608299902\"},{\"country_tx\":null,\"country\":\"United States\",\"link\":\"http://events.iadb.org/Participants/openpreregistration.aspx?776B43A5CA3BF6F82232EB45CF2FB86CCCC92E268FA47143A803CD5ED6FBD9C48227034F68D92B75FA8D899AE9792F55\",\"link_title\":\"http://www.iadb.org/en/events/demand-solutions/2016/silicon-valley,20162.html\",\"benefits\":null,\"legal_information\":null,\"industry\":\"Information & Communication Technology Services\",\"schedule\":[],\"id\":\"25240\",\"title\":\"DEMAND SOLUTIONS\",\"init_date\":\"2016-06-22 00:00:00\",\"end_date\":\"2016-06-22 00:00:00\",\"location\":\"STANFORD UNIVERSITY, SILICON VALLEY, CA\",\"description\":\" dn \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/DSSilicon.jpg\",\"documents\":null,\"speakers\":null,\"supporters\":[{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/GES2016Logo.jpg\",\"website\":\"http://www.ges2016.org/\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/SBAlogo.png\",\"website\":\"https://www.sba.gov/\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/BASES_black.png\",\"website\":\"\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/blum%20logo.jpg\",\"website\":\"http://blumcenter.berkeley.edu/\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/25240\"}},\"created\":\"1608299902\"},{\"country_tx\":\"Peru\",\"country\":\"Peru\",\"link\":\"http://businessperuservicesummit.com/\",\"link_title\":\"Register Here\",\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"24303\",\"title\":\"Per\u00fa Service Summit 2016\",\"init_date\":\"2016-07-11 00:00:00\",\"end_date\":\"2016-07-14 00:00:00\",\"location\":\"Lima, Peru\",\"description\":\" > \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/Logo%20PSS%202015_0.png\",\"documents\":[{\"label\":\"Peru Service Summit 2016\",\"uri\":\"http://local.connectamericas.com/sites/default/files/Peru%20Service%20Summit%202016%20%28e%29%20%282%29.pdf\"}],\"speakers\":null,\"supporters\":[{\"tooltip\":\"Prom Per\u00fa\",\"logo\":\"http://local.connectamericas.com/sites/default/files/promperu_0.PNG\",\"website\":\"http://www.promperu.gob.pe/\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/24303\"}},\"created\":\"1608299902\"},{\"country_tx\":null,\"country\":null,\"link\":null,\"link_title\":null,\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"25090\",\"title\":\"Outsource2LAC - Virtual Edition 2016\",\"init_date\":\"2016-07-27 00:00:00\",\"end_date\":\"2016-07-30 00:00:00\",\"location\":null,\"description\":\"  \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/Virtual%20O2LAC%202016_Eng.jpg\",\"documents\":null,\"speakers\":null,\"supporters\":[{\"tooltip\":\"IDB\",\"logo\":\"http://local.connectamericas.com/sites/default/files/14%20Foro%20Latinoamericano%20Infraestructura%20-%20Patrocinador%205_4.PNG\",\"website\":\"http://www.iadb.org/en/inter-american-development-bank,2837.html\"},{\"tooltip\":\"ConnectAmericas\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ConnectAmericas_1.PNG\",\"website\":\"https://connectamericas.com/\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/25090\"}},\"created\":\"1608299902\"},{\"country_tx\":\"Mexico\",\"country\":\"Mexico\",\"link\":\"http://www.expowomanwork.com/registro.html\",\"link_title\":\"Registrate aqu\u00ed\",\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"23525\",\"title\":\"Expo Woman Work, Guadalajara\",\"init_date\":\"2016-08-26 00:00:00\",\"end_date\":\"2016-08-28 00:00:00\",\"location\":\"Av. Mariano Otero 1499,Verde Valle,44550 Guadalajara, Jal.,M\u00e9xico\",\"description\":\" \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/ExpoWomenWorks%20-%20Logo300.200_1.png\",\"documents\":null,\"speakers\":null,\"supporters\":null,\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/23525\"}},\"created\":\"1608299902\"},{\"country_tx\":\"Turkey\",\"country\":\"Turkey\",\"link\":\"http://es4b.org/app/view.php?id=66811\",\"link_title\":\"Registrate aqu\u00ed\",\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"25771\",\"title\":\"Women Vendors Exhibition and Forum \",\"init_date\":\"2016-09-02 00:00:00\",\"end_date\":\"2016-09-03 00:00:00\",\"location\":null,\"description\":\" n \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/ITC-logo222.png\",\"documents\":null,\"speakers\":null,\"supporters\":[{\"tooltip\":\"The Global Compact\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador_1.PNG\",\"website\":\"https://www.unglobalcompact.org/\"},{\"tooltip\":\"quantum leap\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador1_0.PNG\",\"website\":\"\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador2.PNG\",\"website\":\"\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador3.PNG\",\"website\":\"\"},{\"tooltip\":\"UN Women\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador4.PNG\",\"website\":\"http://www.unwomen.org/en\"},{\"tooltip\":\"WEConnect International\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador5..PNG\",\"website\":\"http://weconnectinternational.org/\"},{\"tooltip\":\"\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ITC-patrocinador7.PNG\",\"website\":\"\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/25771\"}},\"created\":\"1608299902\"},{\"country_tx\":\"USA\",\"country\":\"United States\",\"link\":\"https://www.eventbrite.com/e/1-day-leadership-retreat-tickets-24333582400#tickets\",\"link_title\":\"Register Here\",\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"25610\",\"title\":\"Boston Business Women's Leadership Retreat\",\"init_date\":\"2016-09-17 00:00:00\",\"end_date\":\"2016-09-17 00:00:00\",\"location\":null,\"description\":\" \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/boston%20-%20logo3.png\",\"documents\":null,\"speakers\":null,\"supporters\":[{\"tooltip\":\"Boston Business Women\",\"logo\":\"http://local.connectamericas.com/sites/default/files/boston%20-%20logo_0.PNG\",\"website\":\"http://bostonbusinesswomen.com/\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/25610\"}},\"created\":\"1608299902\"},{\"country_tx\":\"Chile\",\"country\":\"Chile\",\"link\":null,\"link_title\":null,\"benefits\":null,\"legal_information\":null,\"industry\":null,\"schedule\":[],\"id\":\"20885\",\"title\":\"Espacio Food &Service\",\"init_date\":\"2016-09-27 00:00:00\",\"end_date\":\"2016-09-29 00:00:00\",\"location\":\"Espacio Riesco, Avenida El Salto 5000, Huechuraba, Santiago de Chile.\",\"description\":\" \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20Logo300_2.png\",\"documents\":null,\"speakers\":null,\"supporters\":[{\"tooltip\":\"Espacio Riesco\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador1.PNG\",\"website\":\"http://www.espacioriesco.cl/\"},{\"tooltip\":\"ProChile\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador5_0.PNG\",\"website\":\"http://www.prochile.gob.cl/\"},{\"tooltip\":\"CORFO\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador2.PNG\",\"website\":\"http://www.corfo.cl/inicio\"},{\"tooltip\":\"SERCOTEC\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador3.PNG\",\"website\":\"http://www.sercotec.cl/\"},{\"tooltip\":\"Chile Compra\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador4_0.PNG\",\"website\":\"http://www.chilecompra.cl/\"},{\"tooltip\":\"Afida\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador6_0.PNG\",\"website\":\"http://www.afida-latam.org/index.php/es/\"},{\"tooltip\":\"Red de Alimentos\",\"logo\":\"http://local.connectamericas.com/sites/default/files/Espacio%20Food%26Service%20-%20patrocinador7.PNG\",\"website\":\"http://web.redalimentos.cl/\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/20885\"}},\"created\":\"1608299902\"},{\"country_tx\":\"Peru\",\"country\":\"Peru\",\"link\":null,\"link_title\":null,\"benefits\":\" \",\"legal_information\":null,\"industry\":\"Food & Beverage\",\"schedule\":[],\"id\":\"23703\",\"title\":\"Expoalimentaria 2016\",\"init_date\":\"2016-09-28 00:00:00\",\"end_date\":\"2016-09-30 00:00:00\",\"location\":\"Av. Javier Prado Este cruce con carretera Panamericana Sur S/N , alt. Puerta 1 Hip\u00f3dromo de Monterrico, Parcela l, Santiago de Surco, Per\u00fa\",\"description\":\" \",\"afiche\":\"http://local.connectamericas.com/sites/default/files/expoalimentaria%20logo.jpg\",\"documents\":null,\"speakers\":null,\"supporters\":[{\"tooltip\":\"ADEX\",\"logo\":\"http://local.connectamericas.com/sites/default/files/ADEX_0.PNG\",\"website\":\"http://www.adexperu.org.pe/\"},{\"tooltip\":\"PROMPER\u00da\",\"logo\":\"http://local.connectamericas.com/sites/default/files/expoalimentaria%20-patrocinador.jpg\",\"website\":\"http://www.promperu.gob.pe/\"}],\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/event/23703\"}},\"created\":\"1608299902\"}]},\"total_items\":10}";
            servicesExample = "{\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service\"}},\"_embedded\":{\"list\":[{\"author\":{\"name\":\"Intendencia de Canelones\",\"image\":\"http://local.connectamericas.com/sites/default/files/Intendencia%20de%20Canelones.PNG\",\"link\":\"https://www.imcanelones.gub.uy/\",\"link_is_external\":true},\"content_category\":\"Success Stories\",\"industry\":\"Arts and Crafts, Musical Instruments & Entertainment\",\"image\":\"http://local.connectamericas.com/sites/default/files/services/recover1.png\",\"add_campaigns\":[{\"title\":\"Banner 300_250 right ENG\",\"position\":\"TOP\"}],\"id\":\"5687\",\"title\":\"Why Invest in Trinidad and Tobago?\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, Investment, Foreign Direct Investment\",\"additional_info\":\"\",\"description\":\" \",\"created\":\"1415043142\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5687\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5686\",\"title\":\"Reports on Targeted Sectors\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, Market Access, Guide, Tutorials / How To Guide\",\"additional_info\":null,\"description\":\"\",\"created\":\"1415042929\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5686\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5685\",\"title\":\"InvesTT Newsletter \",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago\",\"additional_info\":null,\"description\":\" \",\"created\":\"1415042831\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5685\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5684\",\"title\":\"Market and Investment Opportunity Identification\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, SME\",\"additional_info\":null,\"description\":\" <p \",\"created\":\"1415042757\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5684\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5683\",\"title\":\"Investment Opportunities in Various Sectors\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, Investment, Foreign Direct Investment, Investment treaties\",\"additional_info\":null,\"description\":\" \",\"created\":\"1415042688\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5683\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5682\",\"title\":\"Investment Events across Industries\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, Trade Fairs, Trade mission\",\"additional_info\":null,\"description\":\" <p d\",\"created\":\"1415042598\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5682\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5681\",\"title\":\"Doing Business Report\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, Investment, Guide\",\"additional_info\":null,\"description\":\"\",\"created\":\"1415042485\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5681\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"5680\",\"title\":\"Trinidad and Tobago Country Profile\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Trinidad and Tobago, Investment, Foreign Direct Investment\",\"additional_info\":null,\"description\":\"\",\"created\":\"1415042364\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/5680\"}}},{\"author\":{\"name\":\"InvesTT\",\"image\":null,\"link\":\"http://www.investt.co.tt/\",\"link_is_external\":true},\"content_category\":null,\"industry\":null,\"image\":null,\"add_campaigns\":[],\"id\":\"4022\",\"title\":\"InvestTT explains why Trinidad and Tobago is an ideal investment destination\",\"provider\":null,\"country\":\"Trinidad and Tobago\",\"keywords\":\"Services, Trinidad and Tobago, Investment\",\"additional_info\":\" \",\"description\":\"\",\"created\":\"1408043232\",\"_links\":{\"self\":{\"href\":\"http://m.connectamericas.com/apirest/v6/service/4022\"}}}]},\"total_items\":9}";
            businessExample = "{\"_embedded\":{\"list\":[{\"id\":\"158270\",\"title\":\"Linea Erico SA busca proveedores de nueces mariposas variedad Extra Light. \",\"url\":\"https://connectamericas.com/node/158270?language=es\",\"description\":\" Las nueces mariposas deben ser variedad Extra Light. \nLa empresa debe estar en capacidad de proveer m\u00ednimo 700 cajas de 10 kilos al a\u00f1o.\n \nEs un requisito indispensable para postularse a esta oportunidad, anexar fotograf\u00edas reales de los productos que se ofrecer\u00e1n al comprador y que tu perfil de empresa en ConnectAmericas este completo y verificado.\n \",\"short_description\":\" Linea Erico SA busca proveedores de nueces mariposas variedad Extra Light. \",\"country\":\"Paraguay\",\"industry\":\"Food & Beverage\",\"publish_date\":\"1553122800\",\"finish_date\":\"1567202400\",\"contact_name\":\"ConnectAmericas\",\"contact_email\":\"madeintheamericas@connectamericas.com\",\"contact_telephone\":\"+1 2025237570\",\"author_name\":null,\"author_image\":null,\"attachments\":null,\"requirements\":\" <p>Las nueces mariposas deben ser variedad Extra Light. </p>\n<p>La empresa debe estar en capacidad de proveer m\u00ednimo 700 cajas de 10 kilos al a\u00f1o.</p>\n \",\"idb_project_link\":null,\"idb_project_name\":\"nombre del proyecto4\",\"keywords\":\"Mujeres Empresarias\",\"countries\":\"Argentina, Chile\",\"country_code\":\"py\",\"countries_code\":\"ar,cl\",\"author\":{\"id\":\"133242\",\"name\":\"Linea Erico S.A.\",\"image\":\"https://cdn.connectamericas.com/sites/default/files/erico.jpg\",\"link\":\"/company/linea-erico-sa?language=es\",\"link_is_external\":false},\"country_id\":\"2130\",\"industry_id\":\"1060\",\"external_enabled\":null,\"external_access_button_text\":null,\"external_url\":null,\"form_variant\":\"Food and Beverages\",\"form_variant_url\":\"https://connectamericas.com/postulation/158270\",\"created\":\"1608299902\"},{\"id\":\"152823\",\"title\":\"Caf\u00e9 Kreyol busca proveedores de caf\u00e9 verde de alta calidad\",\"url\":\"https://connectamericas.com/node/152823?language=es\",\"description\":\" A Caf\u00e9 Kreyol le encantan los caf\u00e9s que tienen una historia interesante para contar o que generan alg\u00fan impacto en zonas rurales. \nEspecificaciones: \nDebe ser caf\u00e9 especial verde, no tostado\nNo necesariamente tiene que ser org\u00e1nico ni Fair Trade \nNo exigen cantidad m\u00ednima porque tambi\u00e9n les interesa comprar a proveedores peque\u00f1os\nBuscan cualquier variedad u origen, pero deben ser de alta calidad\nEs importante contar con la capacidad de enviar muestras del producto \nRequieren que el caf\u00e9 venga en bolsas GrainPro dentro del saco.\nEs necesario hacer prueba de humedad antes y despu\u00e9s del env\u00edo de la mercanc\u00eda. \n \nEs un requisito indispensable para postularse a esta oportunidad, anexar fotograf\u00edas reales de los productos que se ofrecer\u00e1n al comprador y que tu perfil de empresa en ConnectAmericas este completo y verificado.\n \",\"short_description\":\"Caf\u00e9 Kreyol busca proveedores de caf\u00e9 verde de alta calidad\",\"country\":\"USA\",\"industry\":\"Food & Beverage\",\"publish_date\":\"1550098800\",\"finish_date\":\"1569794400\",\"contact_name\":\"ConnectAmericas\",\"contact_email\":\"madeintheamericas@connectamericas.com\",\"contact_telephone\":null,\"author_name\":null,\"author_image\":null,\"attachments\":null,\"requirements\":null,\"idb_project_link\":null,\"idb_project_name\":\"nombre del proyect5\",\"keywords\":\"Mujeres Empresarias\",\"countries\":\"Argentina, Bahamas, Barbados, Belice, Bolivia, Brasil, Chile, Colombia, Rep\u00fablica Dominicana, Ecuador, El Salvador, Guatemala, Guyana, Hait\u00ed, Honduras, Jamaica, M\u00e9xico, Panam\u00e1, Per\u00fa, Surinam, Trinidad y Tobago, USA, Venezuela\",\"country_code\":\"us\",\"countries_code\":\"ar,bs,bb,bo,cl,co,ec,sv,gt,gy,ht,hn,jm,mx,pa,pe,us,ve\",\"author\":{\"id\":\"4178\",\"name\":\"Cafe Kreyol\",\"image\":\"https://cdn.connectamericas.com/sites/default/files/company/pictures/CafeKreyol_US_1408652857.jpg\",\"link\":\"/company/cafe-kreyol?language=es\",\"link_is_external\":false},\"country_id\":\"2197\",\"industry_id\":\"1060\",\"external_enabled\":null,\"external_access_button_text\":null,\"external_url\":null,\"form_variant\":\"Food and Beverages\",\"form_variant_url\":\"https://connectamericas.com/postulation/152823\",\"created\":\"1608299902\"},{\"id\":\"159833\",\"title\":\"Seacrest Foods busca proveedores de quesos artesanales en Am\u00e9rica Latina\",\"url\":\"https://connectamericas.com/node/159833?language=es\",\"description\":\" Seacrest Foods busca proveedores de quesos artesanales en Am\u00e9rica Latina.\nNo hay variedad especifica, est\u00e1n abiertos a diferentes ofertas. \nLos proveedores deben estar en capacidad de exportar a Estados Unidos.\n \nEs un requisito indispensable para postularse a esta oportunidad, anexar fotograf\u00edas reales de los productos que se ofrecer\u00e1n al comprador y que tu perfil de empresa en ConnectAmericas este completo y verificado.\n \",\"short_description\":\"Seacrest Foods busca proveedores de quesos en Am\u00e9rica Latina\",\"country\":\"USA\",\"industry\":\"Food & Beverage\",\"publish_date\":\"1551826800\",\"finish_date\":\"1569794400\",\"contact_name\":\"ConnectAmericas\",\"contact_email\":\"madeintheamericas@connectamericas.com\",\"contact_telephone\":\"+1 2025237570\",\"author_name\":null,\"author_image\":null,\"attachments\":null,\"requirements\":\" <p>Quesos artesanales.</p>\n<p>No hay variedad especifica, est\u00e1n abiertos a diferentes ofertas. </p>\n<p>Los proveedores deben estar en capacidad de exportar a Estados Unidos.</p>\n \",\"idb_project_link\":null,\"idb_project_name\":\"nombre del proyecto2\",\"keywords\":\"Mujeres Empresarias\",\"countries\":\"Argelia, Antigua y Barbuda, Bahamas, Belice, Bolivia, Brasil, Chile, Rep\u00fablica Dominicana, Ecuador, El Salvador, Guatemala, Guyana, Hait\u00ed, Honduras, Jamaica, M\u00e9xico, Panam\u00e1, Per\u00fa, Surinam, Trinidad y Tobago, Venezuela\",\"country_code\":\"us\",\"countries_code\":\"bs,bo,cl,ec,sv,gt,gy,ht,hn,jm,mx,pa,pe,ve\",\"author\":{\"id\":\"133154\",\"name\":\"Seacrest Foods International,Inc\",\"image\":\"https://cdn.connectamericas.com/sites/default/files/Seacrest.png\",\"link\":\"/company/seacrest-foods-internationalinc?language=es\",\"link_is_external\":false},\"country_id\":\"2197\",\"industry_id\":\"1060\",\"external_enabled\":null,\"external_access_button_text\":null,\"external_url\":null,\"form_variant\":\"Food and Beverages\",\"form_variant_url\":\"https://connectamericas.com/postulation/159833\",\"created\":\"1608299902\"},{\"id\":\"133046\",\"title\":\"Latin Foods Market  busca proveedores de dulce de leche en Latinoam\u00e9rica\",\"url\":\"https://connectamericas.com/node/133046?language=es\",\"description\":\" Latin Foods Market  busca proveedores de dulce de leche en Latinoam\u00e9rica.\n \nEs un requisito indispensable para postularse a esta oportunidad, anexar fotograf\u00edas reales de los productos que se ofrecer\u00e1n al comprador y que tu perfil de empresa en ConnectAmericas este completo y verificado.\n \n \",\"short_description\":\" \",\"country\":\"USA\",\"industry\":\"Food & Beverage\",\"publish_date\":\"1537480800\",\"finish_date\":\"1569794400\",\"contact_name\":\"ConnectAmericas\",\"contact_email\":\"madeintheamericas@connectamericas.com\",\"contact_telephone\":\"+1 202-623-0000 ext 7340\",\"author_name\":null,\"author_image\":null,\"attachments\":null,\"requirements\":null,\"idb_project_link\":null,\"idb_project_name\":\"nombre del proyecto\",\"keywords\":null,\"countries\":\"Argentina, Bahamas, Barbados, Belice, Bolivia, Brasil, Chile, Colombia, Costa Rica, Rep\u00fablica Dominicana, Ecuador, El Salvador, Guatemala, Guyana, Hait\u00ed, Honduras, Jamaica, M\u00e9xico, Nicaragua, Panam\u00e1, Paraguay, Per\u00fa, Surinam, Trinidad y Tobago, Uruguay, USA, Venezuela\",\"country_code\":\"us\",\"countries_code\":\"ar,bs,bb,bo,cl,co,cr,ec,sv,gt,gy,ht,hn,jm,mx,ni,pa,py,pe,uy,us,ve\",\"author\":{\"id\":\"124632\",\"name\":\"Latin Foods Market\",\"image\":\"https://cdn.connectamericas.com/sites/default/files/LATFOOD_0.png\",\"link\":\"/company/latin-foods-market?language=es\",\"link_is_external\":false},\"country_id\":\"2197\",\"industry_id\":\"1060\",\"external_enabled\":null,\"external_access_button_text\":null,\"external_url\":null,\"form_variant\":\"Food and Beverages\",\"form_variant_url\":\"https://connectamericas.com/postulation/133046\",\"created\":\"1608299902\"},{\"id\":\"133053\",\"title\":\"Latin Foods Market  busca proveedores de caf\u00e9 instant\u00e1neo en Latinoam\u00e9rica\",\"url\":\"https://connectamericas.com/node/133053?language=es\",\"description\":\" Latin Foods Market  busca proveedores de caf\u00e9 instant\u00e1neo en Latinoam\u00e9rica.\n \nEs un requisito indispensable para postularse a esta oportunidad, anexar fotograf\u00edas reales de los productos que se ofrecer\u00e1n al comprador y que tu perfil de empresa en ConnectAmericas este completo y verificado.\n \n \",\"short_description\":\" \",\"country\":\"USA\",\"industry\":\"Food & Beverage\",\"publish_date\":\"1537480800\",\"finish_date\":\"1569794400\",\"contact_name\":\"ConnectAmericas\",\"contact_email\":\"madeintheamericas@connectamericas.com\",\"contact_telephone\":\"+1 202-623-0000 ext 7340\",\"author_name\":null,\"author_image\":null,\"attachments\":null,\"requirements\":null,\"idb_project_link\":null,\"idb_project_name\":\"nombre del proyecto3\",\"keywords\":null,\"countries\":\"Argentina, Bahamas, Barbados, Belice, Bolivia, Brasil, Chile, Colombia, Costa Rica, Rep\u00fablica Dominicana, Ecuador, El Salvador, Guatemala, Guyana, Hait\u00ed, Honduras, Jamaica, M\u00e9xico, Nicaragua, Panam\u00e1, Paraguay, Per\u00fa, Surinam, Trinidad y Tobago, Uruguay, USA, Venezuela\",\"country_code\":\"us\",\"countries_code\":\"ar,bs,bb,bo,cl,co,cr,ec,sv,gt,gy,ht,hn,jm,mx,ni,pa,py,pe,uy,us,ve\",\"author\":{\"id\":\"124632\",\"name\":\"Latin Foods Market\",\"image\":\"https://cdn.connectamericas.com/sites/default/files/LATFOOD_0.png\",\"link\":\"/company/latin-foods-market?language=es\",\"link_is_external\":false},\"country_id\":\"2197\",\"industry_id\":\"1060\",\"external_enabled\":null,\"external_access_button_text\":null,\"external_url\":null,\"form_variant\":\"Food and Beverages\",\"form_variant_url\":\"https://connectamericas.com/postulation/133053\",\"created\":\"1608299902\"}]},\"total_items\":5}";
        }

        /// <inheritdoc />
        public IResponse GenerateUrl()
        {
            var id = _guidGenerator.SQLServerSequentialGuid();
            _cache.Set(id.ToString(), "", _loginCache.IdExpirationTime);

            var url = $"{_domainUrl.BaseUrl}/api/CAS/setTicket/{id}";
            return new Response<UrlHelperLoginResponseDto>(data: new UrlHelperLoginResponseDto(url, id));
        }

        /// <inheritdoc />
        public async Task<IResponse> WaitForLogin(Guid id, CancellationToken cancellationToken)
        {
            var count = 0;
            var errorGettingData = false;

            while (_cache.TryGetValue(id.ToString(), out object value))
            {
                var basicUserInformationAsString = value?.ToString() ?? "";

                if (string.IsNullOrEmpty(basicUserInformationAsString))
                {
                    Thread.Sleep(_loginCache.ThreadSleepTime);
                    if (count >= _loginCache.WaitForLoginExpirationTime)
                    {
                        _cache.Remove(id.ToString());
                        _cache.Remove($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}");
                        return new Response<LoginResponseDto>(message: $"{CASLoginAccessMessages.WaitForLoginExpired:D}")
                        {
                            Errors = new List<string>() { CASLoginAccessMessages.WaitForLoginExpired.GetDescription() }
                        };
                    }

                    if (_cache.TryGetValue($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}", out object errorGettingDataT))
                        errorGettingData = (bool)errorGettingDataT;

                    count++;
                    if (!errorGettingData) continue;
                }

                _cache.Remove($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}");
                _cache.Remove(id.ToString());

                if (!errorGettingData)
                {
                    var basicUserInformation = JsonConvert.DeserializeObject<BasicUserInformationResponseDto>(basicUserInformationAsString);
                    var profileResponse = (Response<UserProfileResponseDto>)await GetUserProfileAsync(basicUserInformation.token, cancellationToken);
                    return await ForLoginInClnAsync(basicUserInformation, profileResponse, cancellationToken);
                }

                return new Response<LoginResponseDto>(message: $"{CASLoginAccessMessages.LoginFailed:D}")
                {
                    Errors = new List<string>() { CASLoginAccessMessages.LoginFailed.GetDescription() }
                };
            }

            return new Response<LoginResponseDto>(message: $"{CASLoginAccessMessages.TimeoutToFetchData:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.TimeoutToFetchData.GetDescription() }
            };
        }

        /// <inheritdoc />
        public async Task<IResponse> GetBasicUserInformationAsync(Guid id, string ticket, CancellationToken cancellationToken)
        {
            _cache.Set($"ticket-{id}", ticket);
            var error = new Response<object>(message: $"{CASLoginAccessMessages.ErrorGettingData:D}-{id}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingData.GetDescription() }
            };

            try
            {
                var response = await _casClientService.GetBasicUserInformationAsync(id, ticket, cancellationToken);

                _cache.Set($"Respuesta servicio-{id}", response);
                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    var basicUserInformation = await response.Content.ReadAsStringAsync(cancellationToken);

                    if (!_cache.TryGetValue(id.ToString(), out _))
                    {
                        _cache.Set($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}", true);
                        return new Response<bool>(message: $"{CASLoginAccessMessages.TimeoutToFetchData:D}:{CASLoginAccessMessages.TimeoutToFetchData:D}")
                        {
                            Errors = new List<string>() { CASLoginAccessMessages.TimeoutToFetchData.GetDescription() }
                        };
                    }

                    _cache.Set(id.ToString(), basicUserInformation);
                    _cache.Set($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}", false);
                    return null;//new Response<bool>(true, message: $"{CASLoginAccessMessages.DataObtained:D}:{CASLoginAccessMessages.DataObtained.GetDescription()}");
                }

                _cache.Set($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}", true);
                //error.Data = response;
                return error;
            }
            catch (Exception ex)
            {
                _cache.Set($"{CASLoginAccessMessages.ErrorGettingData:D}-{id}", true);
                error.Data = ex;
                return error;
            }
        }

        /// <inheritdoc />
        public async Task<IResponse> GetUserProfileAsync(string token, CancellationToken cancelationToken)
        {
            var error = new Response<UserProfileResponseDto>(message: $"{CASLoginAccessMessages.ErrorGettingProfile:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingProfile.GetDescription() }
            };

            try
            {
                var response = await _casClientService.GetUserProfileAsync(token, cancelationToken);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var content = await response.Content.ReadAsStringAsync(cancelationToken);
                    var result = (UserProfileResponseDto)JsonConvert.DeserializeObject(content, typeof(UserProfileResponseDto));

                    return new Response<UserProfileResponseDto>(result);
                }

                return error;
            }
            catch (Exception)
            {
                // to do: add to log service

                return error;
            }
        }

        /// <inheritdoc />
        public async Task<IResponse> GetUserCompanyInformationAsync(int companyId, CancellationToken cancelationToken)
        {
            var error = new Response<CompanyProfileDto>(message: $"{CASLoginAccessMessages.ErrorGettingCompany:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingCompany.GetDescription() }
            };

            try
            {
                var response = await _casClientService.GetUserCompanyInformationAsync(companyId, cancelationToken);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var content = await response.Content.ReadAsStringAsync(cancelationToken);
                    var result = (UserCompanyInformationResponseDto)JsonConvert.DeserializeObject(content, typeof(UserCompanyInformationResponseDto));

                    var companyProfileDto = _mapper.Map<CompanyProfileDto>(result, mapping =>
                    {
                        mapping.Items.Add(KeyValuePair.Create<string, object>(nameof(CompanyProfileDto.CompanyId), companyId));
                    });

                    return new Response<CompanyProfileDto>(companyProfileDto);
                }
                return error;
            }
            catch (Exception)
            {
                // to do: add to log service

                return error;
            }
        }


        /// <inheritdoc />
        public async Task<IResponse> GetUserCompanyInformationforCompanyProfile(int userId, int companyId, CancellationToken cancelationToken)
        {
            var response = new Response<CompanyProfileDto>(message: $"{CASLoginAccessMessages.ErrorGettingCompany:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingCompany.GetDescription() }
            };

            var success = false;
            var dateStartProcess = DateTime.Now;
            ProcessResult processResult = new();
            processResult.ServiceUrl = $"{_CASUrl.BaseUrl}{_CASUrl.CompanyUrl}/{companyId}";
            try
            {
                var responseCAS = await _casClientService.GetUserCompanyInformationAsync(companyId, cancelationToken);
                processResult.ServiceResult = JsonConvert.SerializeObject(responseCAS);
                
                if (responseCAS.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var content = await responseCAS.Content.ReadAsStringAsync(cancelationToken);
                    var result = (UserCompanyInformationResponseDto)JsonConvert.DeserializeObject(content, typeof(UserCompanyInformationResponseDto));

                    var companyProfileDto = _mapper.Map<CompanyProfileDto>(result, mapping =>
                    {
                        mapping.Items.Add(KeyValuePair.Create<string, object>(nameof(CompanyProfileDto.CompanyId), companyId));
                    });

                    response = new Response<CompanyProfileDto>(companyProfileDto);
                    success = true;
                }

                var dateEndProcess = DateTime.Now;
                processResult.Result = success ? ConstantCAS.sucessfullRequest : ConstantCAS.badRequest;
                await _commonService.SetProcessLog(1, ConstantCAS.nameProcessCompanyProfile, dateStartProcess, dateEndProcess, success, processResult, userId);

                return response;
            }
            catch (Exception ex)
            {
                // to do: add to log service
                var dateEndProcess = DateTime.Now;
                processResult.ProcessError = ex.Message;
                processResult.Result = ConstantCAS.badRequest;
                await _commonService.SetProcessLog(1, ConstantCAS.nameProcessCompanyProfile, dateStartProcess, dateEndProcess, success, processResult, userId);
                return response;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="basicUserInformation"></param>
        /// <param name="profileResponse"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        private async Task<IResponse> ForLoginInClnAsync(BasicUserInformationResponseDto basicUserInformation, Response<UserProfileResponseDto> profileResponse, CancellationToken cancellationToken)
        {
            if (profileResponse.Succeeded)
            {
                var profile = profileResponse.Data;

                var casLogin = new CASLoginDto
                {
                    Id = basicUserInformation.id,
                    Token = basicUserInformation.token,
                    FirstName = basicUserInformation.first_name,
                    LastName = basicUserInformation.last_name,
                    Username = basicUserInformation.username,
                    Email = profile?.email,
                    Country = profile?.country_name,
                    CountryCode = profile?.country_code,
                    IsAdmin = profile?.is_admin == "ptp",
                    Companies = profile?.charges?.Select(p => new CompanyToSaveDto
                    {
                        CompanyId = (int)(p.company?.selected?.id),
                        Name = p.company?.selected?.name ?? "",
                        IsOwner = p?.isOwner,
                        IsAdmin = p?.user_is_admin
                    }).ToArray()
                };

                if (string.IsNullOrEmpty(casLogin.Email)) return new Response<LoginResponseDto>(message: $"{CASLoginAccessMessages.EmailNotFoundInProfile:D}")
                {
                    Errors = new List<string>() { CASLoginAccessMessages.EmailNotFoundInProfile.GetDescription() }
                };

                return await _autenticationService.LoginCASAsync(casLogin, cancellationToken);
            }

            return new Response<LoginResponseDto>(message: profileResponse.Message)
            {
                Errors = profileResponse.Errors
            };
        }
        
        /// <inheritdoc />
        public async Task<IResponse> GetCLNEventsAsync(CancellationToken cancelationToken)
        {
            var error = new Response<List<Event>>(message: $"{CASLoginAccessMessages.ErrorGettingEvents:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingEvents.GetDescription() }
            };

            try
            {
                var items = 60;
                var offset = 0;
                var lEvents = new List<Event>();
                var  _continue= true;
                do {
                    var response = await _casClientService.GetCLNEventsAsync(items.ToString(), offset.ToString(), cancelationToken);

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var content = await response.Content.ReadAsStringAsync(cancelationToken);
                        content = content.Replace("event","list");
                        var result = (EventResponseDto)JsonConvert.DeserializeObject(/*eventsExample*/content, typeof(EventResponseDto));
                        if (result.total_items == 0)
                        { _continue = false; }
                        else 
                        { 
                            lEvents.AddRange(result._embedded.list);
                            offset = items - 1;
                            _continue = false; //solo para el ejemplo
                        }
                    }
                    else { _continue = false; }
                }
                while (_continue);

                return new Response<List<Event>>(lEvents);
                //return error;
            }
            catch (Exception)
            {
                return error;
            }
        }

        /// <inheritdoc />
        public async Task<IResponse> GetCLNServicessAsync(CancellationToken cancelationToken)
        {
            var error = new Response<List<Service>>(message: $"{CASLoginAccessMessages.ErrorGettingServices:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingServices.GetDescription() }
            };

            try
            {
                var items = 60;
                var offset = 0;
                var lServices = new List<Service>();
                var _continue = true;
                do
                {
                    var response = await _casClientService.GetCLNServicesAsync(items.ToString(), offset.ToString(), cancelationToken);

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var content = await response.Content.ReadAsStringAsync(cancelationToken);
                        content = content.Replace("service", "list");
                        var result = (ServiceResponseDto)JsonConvert.DeserializeObject(/*servicesExample*/content, typeof(ServiceResponseDto));
                        if (result.total_items == 0)
                        { _continue = false; }
                        else
                        {
                            lServices.AddRange(result._embedded.list);
                            offset = items - 1;
                            _continue = false; //solo para el ejemplo
                        }
                    }
                    else { _continue = false; }
                }
                while (_continue);

                return new Response<List<Service>>(lServices);
                //return error;
            }
            catch (Exception)
            {
                return error;
            }
        }

        /// <inheritdoc />
        public async Task<IResponse> GetCLNBusinessOpportunitiesAsync(CancellationToken cancelationToken)
        {
            var error = new Response<List<BusinessOpportunity>>(message: $"{CASLoginAccessMessages.ErrorGettingBusinessOpportunities:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingBusinessOpportunities.GetDescription() }
            };

            try
            {
                var items = 60;
                var offset = 0;
                var lBusiness = new List<BusinessOpportunity>();
                var _continue = true;
                do
                {
                    var response = await _casClientService.GetCLNBusinessOpportunitiesAsync(items.ToString(), offset.ToString(), cancelationToken);

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var content = await response.Content.ReadAsStringAsync(cancelationToken);
                        content = content.Replace("business_opportunity", "list");
                        var result = (BusinessOpportunityResponseDto)JsonConvert.DeserializeObject(/*businessExample*/content, typeof(BusinessOpportunityResponseDto));
                        if (result.total_items == 0)
                        { _continue = false; }
                        else
                        {
                            lBusiness.AddRange(result._embedded.list);
                            offset = items - 1;
                            _continue = false; //solo para el ejemplo
                        }
                    }
                    else { _continue = false; }
                }
                while (_continue);

                return new Response<List<BusinessOpportunity>>(lBusiness);
                //return error;
            }
            catch (Exception)
            {
                return error;
            }
        }

        /// <inheritdoc />
        public async Task<IResponse> GetCLNCommunitiesAsync(CancellationToken cancelationToken)
        {
            var error = new Response<CompanyProfileDto>(message: $"{CASLoginAccessMessages.ErrorGettingCommunities:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingCommunities.GetDescription() }
            };

            try
            {
                var items = 60;
                var offset = 0;
                var lCommunities = new List<Community>();
                var _continue = true;
                do
                {
                    var response = await _casClientService.GetCLNCommunitiesAsync(items.ToString(), offset.ToString(), cancelationToken);

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var content = await response.Content.ReadAsStringAsync(cancelationToken);
                        content = content.Replace("community", "list");
                        var result = (CommunityResponseDto)JsonConvert.DeserializeObject(content, typeof(CommunityResponseDto));
                        if (result.total_items == 0)
                        { _continue = false; }
                        else
                        {
                            lCommunities.AddRange(result._embedded.list);
                            offset = items - 1;
                        }
                    }
                    else { _continue = false; }
                }
                while (_continue);

                return new Response<List<Community>>(lCommunities);
                //return error;
            }
            catch (Exception)
            {
                return error;
            }
        }

        ///// <inheritdoc />
        //public async Task<IResponse> SetUserTokenAsync(string token, CancellationToken cancellationToken)
        //{
        //    var response = (Response<UserProfileResponseDto>)await GetUserProfileAsync(token, cancellationToken);

        //    if (response.Succeeded)
        //    {
        //        var profile = response.Data;

        //        var newSessionToken = new SessionToken
        //        {
        //            UserId = int.Parse(profile.id),
        //            Email = profile.email,
        //            Token = token,
        //            Created = DateTime.UtcNow
        //        };

        //        return await _autenticationService.SaveSessionTokenAsync(newSessionToken, cancellationToken);
        //    }

        //    return new Response<bool>($"{CASLoginAccessMessages.SessionTokenSaveFail:D}")
        //    {
        //        Errors = new List<string>() { CASLoginAccessMessages.SessionTokenSaveFail.GetDescription() }
        //    };
        //}

        ///// <inheritdoc />
        //public async Task<IResponse> LoginwithUserInSessionAsync(string email, CancellationToken cancellationToken)
        //{
        //    try
        //    {
        //        var session = await _autenticationService.GetUserInSessionByEmailAsync(email, cancellationToken);

        //        if (session == null)
        //            return new Response<LoginResponseDto>($"{CASLoginAccessMessages.ErrorGettingSession:D}:{CASLoginAccessMessages.ErrorGettingSession.GetDescription()}")
        //            {
        //                Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingSession.GetDescription() }
        //            };

        //        var profileResponse = (Response<UserProfileResponseDto>)await GetUserProfileAsync(session.Token, cancellationToken);

        //        if (profileResponse.Succeeded)
        //        {
        //            var basicUserInformation = new BasicUserInformationResponseDto()
        //            {
        //                token = session.Token,
        //                id = session.UserId,
        //                first_name = profileResponse.Data?.first_name ?? string.Empty,
        //                last_name = profileResponse.Data?.last_name ?? string.Empty,
        //                username = string.Empty
        //            };

        //            return await ForLoginInClnAsync(basicUserInformation, profileResponse, cancellationToken);
        //        }

        //        return new Response<LoginResponseDto>(profileResponse.Message)
        //        {
        //            Errors = profileResponse.Errors
        //        };
        //    }
        //    catch (Exception)
        //    {
        //        return new Response<LoginResponseDto>($"{CASLoginAccessMessages.ErrorGettingSession:D}:{CASLoginAccessMessages.ErrorGettingSession.GetDescription()}")
        //        {
        //            Errors = new List<string>() { CASLoginAccessMessages.ErrorGettingSession.GetDescription() }
        //        };
        //    }
        //}
    }
}
