using ClosedXML.Excel;
using iText.Html2pdf;
using iText.Html2pdf.Resolver.Font;
using iText.IO.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout.Font;
using iText.StyledXmlParser.Css.Media;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Tweetinvi.Security;

namespace CLN.services.Helpers
{
    public static class Helpers
    {
        private const string LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
        private const string UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string NUMERIC_CHARACTERS = "0123456789";
        private const string SPECIAL_CHARACTERS = @"!#$%*\";
        private const string SPACE_CHARACTER = " ";
        private const int PASSWORD_LENGTH_MIN = 8;
        private const int PASSWORD_LENGTH_MAX = 128;

        public static string EncryptSha1(string password)
        {
            UTF8Encoding enc = new();
            byte[] data = enc.GetBytes(password);
            byte[] result;

            SHA1CryptoServiceProvider sha = new();

            result = sha.ComputeHash(data);

            StringBuilder sb = new();
            for (int i = 0; i < result.Length; i++)
            {

                // Convertimos los valores en hexadecimal
                // cuando tiene una cifra hay que rellenarlo con cero
                // para que siempre ocupen dos dígitos.
                if (result[i] < 16)
                {
                    sb.Append("0");
                }
                sb.Append(result[i].ToString("x"));
            }
            return sb.ToString().ToUpper();
        } 
        public static string GeneratePassword(bool includeLowercase, bool includeUppercase, bool includeNumeric, bool includeSpecial, bool includeSpaces, int lengthOfPassword)
        {
            if (lengthOfPassword < PASSWORD_LENGTH_MIN || lengthOfPassword > PASSWORD_LENGTH_MAX)
            {
                return "Password length must be between 8 and 128.";
            }

            string characterSet = String.Empty;

            if (includeLowercase)
            {
                characterSet += LOWERCASE_CHARACTERS;
            }

            if (includeUppercase)
            {
                characterSet += UPPERCASE_CHARACTERS;
            }

            if (includeNumeric)
            {
                characterSet += NUMERIC_CHARACTERS;
            }

            if (includeSpecial)
            {
                characterSet += SPECIAL_CHARACTERS;
            }

            if (includeSpaces)
            {
                characterSet += SPACE_CHARACTER;
            }

            char[] password = new char[lengthOfPassword];
            int characterSetLength = characterSet.Length;

            Random random = new Random();
            for (int characterPosition = 0; characterPosition < lengthOfPassword; characterPosition++)
            {
                password[characterPosition] = characterSet[random.Next(characterSetLength - 1)];
            }
            Random randomw = new();
            string def = "Az-" + randomw.Next(5).ToString();
            return string.Join(null, password) + def;
        }

        public static object DownloadFile(string pRute, string fileName)
        {

            Stream stream = null;
            object obj = null;

            if (File.Exists(pRute))
                stream = new FileStream(pRute, FileMode.Open, FileAccess.Read);

            if (stream != null)
            {
                new FileExtensionContentTypeProvider().TryGetContentType(fileName, out string contentType);
                try
                {
                    var content = stream;
                    obj = new { content, contentType = contentType ?? "application/octet-stream", fileName };
                }
                catch (Exception) { }
            }

            return obj;
        }

        public static object DownloadFile(object stream, string fileName)
        {
            //FileStream stream = null;
            object obj = null;

            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out string contentType);
            try
            {
                if (stream != null)
                {
                    var st = new MemoryStream((byte[])stream);
                    var content = st;
                    obj = new { content, contentType = contentType ?? "application/octet-stream", fileName };
                }
            }
            catch (Exception e) { }
            return obj;
        }

        public static object GetValue(object obj, string property)
        {
            return obj.GetType().GetProperty(property).GetValue(obj, null);
        }

        public static string FirstCharToUpper(string text)
        {
            string input = text.ToLower();
            string newText = input.First().ToString().ToUpper() + input.Substring(1);
            return newText;
        }

        public static object CreateExcelDynamically<T>(List<T> entity, string name)
        {
            byte[] content = null;
            if (entity == null)
                return content;

            var workbook = new XLWorkbook();
            IXLWorksheet worksheet = workbook.Worksheets.Add(name);

            Type typeOfObject = typeof(T);
            // read properties
            var properties = typeOfObject.GetProperties();
            var propertiesName = properties.Select(x => x.CustomAttributes.FirstOrDefault().ConstructorArguments.FirstOrDefault().Value.ToString()).ToList();

            JObject xptJson;//= ToSerialize(entity[0]);
            List<JProperty> xptProps; //= xptJson.Properties().ToList();

            // Build file
            //for (int i = 0; i < xptProps.Count; i++)
            //    worksheet.Cell(1, i + 1).Value = xptProps[i].Path;
            for (int i = 0; i < propertiesName.Count; i++)
                worksheet.Cell(1, i + 1).Value = propertiesName[i];

            for (int index = 0; index < entity.Count; index++)
            {
                xptJson = ToSerialize(entity[index]);
                // read properties
                xptProps = xptJson.Properties().ToList();

                for (int i = 0; i < xptProps.Count; i++)
                    worksheet.Cell(index + 2, i + 1).Value = xptProps[i].Value.ToString();
            }

            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                content = stream.ToArray();
            }

            return content;
        }

        public static object CreateExcelDynamicallybyDataTable(DataTable dt, string name, bool format)
        {
            byte[] content = null;
            if (dt == null)
                return content;

            var workbook = new XLWorkbook();
            workbook.Worksheets.Add(dt, name);

            if (!format)
            {
                workbook.ShowRowColHeaders = false;

                foreach (IXLWorksheet workSheet in workbook.Worksheets)
                {
                    foreach (IXLTable table in workSheet.Tables)
                    {
                        workSheet.Table(table.Name).Theme = XLTableTheme.None;
                        workSheet.Table(table.Name).ShowAutoFilter = false;
                        workSheet.ConditionalFormats.RemoveAll();
                        workSheet.Table(table.Name).ShowColumnStripes = false;
                        workSheet.Table(table.Name).ShowRowStripes = false;
                    }
                }
            }

            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                content = stream.ToArray();
            }

            return content;
        }

        public static JObject ToSerialize(dynamic obj)
        {
            string json = JsonConvert.SerializeObject(obj);

            // convert JSON to object
            return JObject.Parse(json);
        }

        public static bool WriteTrackLog(string path, string strLog)
        {
            var resultado = false;


            if (!File.Exists(path))
                File.Create(path);

            using (System.IO.StreamWriter file = new System.IO.StreamWriter(path, true))
            {
                file.WriteLine(strLog);
                resultado = true;
            }

            return resultado;
        }

        public static string DayOfWeek(DateTime fecha)
        {
            var dayOfWeek = fecha.DayOfWeek.ToString();

            switch (dayOfWeek)
            {
                case ("Monday"):
                    dayOfWeek = "Lunes";
                    break;
                case ("Tuesday"):
                    dayOfWeek = "Martes";
                    break;
                case ("Wednesday"):
                    dayOfWeek = "Miercoles";
                    break;
                case ("Thursday"):
                    dayOfWeek = "Jueves";
                    break;
                case ("Friday"):
                    dayOfWeek = "Viernes";
                    break;
                case ("Saturday"):
                    dayOfWeek = "Sabado";
                    break;
                case ("Sunday"):
                    dayOfWeek = "Domingo";
                    break;
            }

            return dayOfWeek;
        }

        public static string GetTimestamp(DateTime value)
        {
            return DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
        }

        public static DateTime GetDateTimefromTimeStamp(string timeStamp) {
            try {
                var dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                var unixTimeStamp = long.Parse(timeStamp);
                dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();

                return dtDateTime;
            } 
            catch { return GetDateTimefromString(timeStamp); }            
        }

        public static DateTime GetDateTimefromString(string date) {
            try
            {
                CultureInfo esCO = new("es-CO");
                return DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            }
            catch { return new(); }
        }

        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                    {
                        pro.SetValue(obj, dr[column.ColumnName], null);
                        break;
                    }
                    else
                        continue;
                }
            }
            return obj;
        }

        public static object GeneratePDFfromHTML(string htmlSource, string fontPath)
        {
            byte[] content = null;
            //using (var stream = new MemoryStream())
            //{
            //    ConverterProperties converterProperties = new();
            //    HtmlConverter.ConvertToPdf(htmlSource, stream, converterProperties);
            //    content = stream.ToArray();
            //}
            using (var stream = new MemoryStream())
            {
                PdfWriter writer = new PdfWriter(stream);
                PdfDocument pdf = new PdfDocument(writer);
                pdf.SetTagged();
                PageSize pageSize = PageSize.LETTER;
                pdf.SetDefaultPageSize(pageSize);
                ConverterProperties properties = new ConverterProperties();
                FontProvider fontProvider = new DefaultFontProvider();
                fontProvider.AddDirectory(fontPath);
                properties.SetFontProvider(fontProvider);
                //properties.SetBaseUri(baseUri);
                MediaDeviceDescription mediaDeviceDescription
                    = new MediaDeviceDescription(MediaType.SCREEN);
                mediaDeviceDescription.SetWidth(pageSize.GetWidth());
                properties.SetMediaDeviceDescription(mediaDeviceDescription);
                HtmlConverter.ConvertToPdf(htmlSource, pdf, properties);
                content = stream.ToArray();
            }
            return content;
        }
    }
}
