using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace CLN.services.Services
{
    public class GTrendsService: IGTrendsService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        public GTrendsService(CLNContext context, ICommonService commonService)
        {
            this._context = context;
            this._commonService = commonService;
        }

        // 1 lista  2 objeto
        public async Task<IResponse> GetGoogleTrendsJsonModel(string keyWord)
        {
            var result = (List<GTrendsDto>) await _commonService.ExcuteSqlStoredProcedure<GTrendsDto>("GetGoogleTrendsUrls", null, 1);

            var modelResult = SetGTrendsJson(keyWord,result);

            return new Response<GTrendsJsonDto>(modelResult, null);
        }


        private GTrendsJsonDto SetGTrendsJson(string keyWord,List<GTrendsDto> x)
        {
            var currentTime = DateTime.Now.Date.ToString("yyyy-MM-dd");
            var beforeTime = DateTime.Now.AddYears(-1).Date.ToString("yyyy-MM-dd");

            var modelResult = new GTrendsJsonDto();
            modelResult.guestPath = x[0].name;
            modelResult.exploreQuery = x[4].name + keyWord.Replace(" ", "%20") + x[5].name + x[2].name;
            modelResult.type = x[7].name;
            modelResult.category = 0;
            modelResult.property = string.Empty;
            modelResult.moreTrendsUrl = x[6].name;

            modelResult.comparisonItem = new List<ComparisonItem>();
            var itemComparison = new ComparisonItem();
            itemComparison.keyword = keyWord;
            itemComparison.geo = x[1].name;
            itemComparison.time = beforeTime + " " + currentTime;
            modelResult.comparisonItem.Add(itemComparison);


            return modelResult;
        }


        public async Task<IResponse> GetGoogleTrendsJsonModel()
        {
            var result = (List<GTrendsDto>)await _commonService.ExcuteSqlStoredProcedure<GTrendsDto>("GetGoogleTrendsUrls", null, 1);

            var modelResult = SetGTrendsJson(result);

            return new Response<GTrendsJsonDto>(modelResult, null);
        }

        private GTrendsJsonDto SetGTrendsJson(List<GTrendsDto> x)
        {
            var currentTime = DateTime.Now.Date.ToString("yyyy-MM-dd");
            var beforeTime = DateTime.Now.AddYears(-1).Date.ToString("yyyy-MM-dd");

            var modelResult = new GTrendsJsonDto();
            modelResult.guestPath = x[0].name;
            modelResult.exploreQuery = string.Empty;
            modelResult.type = x[3].name;
            modelResult.category = 0;
            modelResult.property = string.Empty;
            modelResult.moreTrendsUrl = x[6].name;

            modelResult.comparisonItem = new List<ComparisonItem>();
            var itemComparison = new ComparisonItem();
            itemComparison.keyword = string.Empty;
            itemComparison.geo = x[1].name;
            itemComparison.time = beforeTime + " " + currentTime;
            modelResult.comparisonItem.Add(itemComparison);


            return modelResult;
        }


        public async Task<IResponse> GetSocialFeatures()
        {
            
            var result = (List<GTrendsDto>)await _commonService.ExcuteSqlStoredProcedure<GTrendsDto>("GetSocialFeatures", null,1);
            var model = SetSocialFeatures(result);

            return new Response<GSocialFeatures>(model, null);
        }


        private  GSocialFeatures SetSocialFeatures(List<GTrendsDto> lst)
        {
            var model = new GSocialFeatures();
            model.Youtube = new Propertys()
            {
                Url = lst.Where(x => x.name == "urlYoutube").Select(x => x.translation).FirstOrDefault(),
                Token = lst.Where(x => x.name == "apiKeyYoutube").Select(x => x.translation).FirstOrDefault(),
                Id = lst.Where(x => x.name == "canalIdYoutube").Select(x => x.translation).FirstOrDefault()
            };

            model.Flickr = new Propertys()
            {
                Url = lst.Where(x => x.name == "urlFlickr").Select(x => x.translation).FirstOrDefault(),
                Token = lst.Where(x => x.name == "apiKeyFlickr").Select(x => x.translation).FirstOrDefault(),
                Id = lst.Where(x => x.name == "userIdFlickr").Select(x => x.translation).FirstOrDefault()

            };

            model.Instagram= new Propertys()
            {
                Url = lst.Where(x => x.name == "urlInstagram").Select(x => x.translation).FirstOrDefault(),
                Token = lst.Where(x => x.name == "tokenInstagram").Select(x => x.translation).FirstOrDefault(),
            };

            model.Facebook = new Propertys()
            {
                Url = lst.Where(x => x.name == "urlFacebook").Select(x => x.translation).FirstOrDefault()
            };

            model.Twitter = new Propertys()
            {
                Url = lst.Where(x => x.name == "urlTwitter").Select(x => x.translation).FirstOrDefault()
            };

            return model;
        }

    }
}
