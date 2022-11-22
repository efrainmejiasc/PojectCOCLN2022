using CLN.model.Models;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IFreeMarketService
    {
        Task<IResponse> GetFreeMarketTrendsAsync(string tokenML, string urlTrends);
        Task<IResponse> GetFreeMarketCategoriesAsync(string tokenML, string urlCategories);
        Task<IResponse> GetFreeMarketProductAsync(string keyWord, string tokenML, string urlProduct);
        Task<IResponse> GetFreeMarketTrendsCategorieAsync(string tokenML, string urlTrends, string categorie);
        Task<IResponse> GetFreeMarketEspecificCategorieAsync(string strCategorie, string tokenML, string urlSubCategories);
    }
}
