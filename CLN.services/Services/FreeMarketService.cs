using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class FreeMarketService : IFreeMarketService
    {
        //Devuelve tendencias de busqueda en Colombia
        public async Task<IResponse> GetFreeMarketTrendsAsync(string tokenML, string urlTrends)
        {
            var respuesta = string.Empty;
            var lstTrends = new List<FreeMarketTrends>();

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenML);
            HttpResponseMessage response = await client.GetAsync(urlTrends);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                lstTrends = JsonConvert.DeserializeObject<List<FreeMarketTrends>>(respuesta);
            }
            else
                lstTrends = null;

            return new Response<List<FreeMarketTrends>> (lstTrends, null);
        }


        //Devuelve tendencias de busqueda en Colombia de una Categoria especifica
        public async Task<IResponse> GetFreeMarketTrendsCategorieAsync(string tokenML, string urlTrends, string categorie)
        {
            var respuesta = string.Empty;
            var lstTrends = new List<FreeMarketTrends>();
            
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenML);
            HttpResponseMessage response = await client.GetAsync(urlTrends + categorie);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                lstTrends = JsonConvert.DeserializeObject<List<FreeMarketTrends>>(respuesta);
            }
            else
                lstTrends = null;

            return new Response<List<FreeMarketTrends>>(lstTrends, null);
        }

        //Devuelve todas las categorias Colombia
        public async Task<IResponse> GetFreeMarketCategoriesAsync(string tokenML, string urlCategories)
        {
            var respuesta = string.Empty;
            var lstCategories = new List<CategoriesFreeMarket>();

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenML);
            HttpResponseMessage response = await client.GetAsync(urlCategories);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                lstCategories = JsonConvert.DeserializeObject<List<CategoriesFreeMarket>>(respuesta);
            }
            else
                lstCategories = null;


            return new Response<List<CategoriesFreeMarket>>(lstCategories, null);
        }

        //Devuelve todas las sub categorias de una especifica
        public async Task<IResponse> GetFreeMarketEspecificCategorieAsync(string strCategorie,string tokenML, string urlSubCategories)
        {
            var respuesta = string.Empty;
            var categorie = new CategorieSubFreeMarket();

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenML);
            HttpResponseMessage response = await client.GetAsync(urlSubCategories + strCategorie);
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                categorie = JsonConvert.DeserializeObject<CategorieSubFreeMarket>(respuesta);
            }
            else
                categorie = null;

            return new Response<CategorieSubFreeMarket>(categorie, null);
        }

        //Devuelve datos de un producto especifiico
        public async Task<IResponse> GetFreeMarketProductAsync(string keyWord, string tokenML, string urlProduct)
        {
            var respuesta = string.Empty;
            var product = new FreeMarketProduct();
            keyWord = keyWord.Replace(" ", "%20");

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenML);
            HttpResponseMessage response = await client.GetAsync(urlProduct + keyWord + "&limit=100");
            if (response.IsSuccessStatusCode)
            {
                respuesta = await response.Content.ReadAsStringAsync();
                product = JsonConvert.DeserializeObject<FreeMarketProduct>(respuesta);
            }
            else
                product = null;

            return new Response<FreeMarketProduct>(product, null);
        }
    }
}
