using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class CategorieSubFreeMarket
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public string Permalink { get; set; }
        public int Total_Items_In_This_Category { get; set; }
        public List<PathFromRoot> Path_From_Root { get; set; }
        public List<ChildrenCategory> Children_Categories { get; set; }
        public string Attribute_Types { get; set; }
        public Settings Settings { get; set; }
        public List<ChannelsSetting> Channels_Settings { get; set; }
        public object Meta_Categ_Id { get; set; }
        public bool Attributable { get; set; }
        public DateTime Date_Created { get; set; }
    }

    public class PathFromRoot
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class ChildrenCategory
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Total_Items_In_This_Category { get; set; }
    }

    public class Settings
    {
        public bool Adult_Content { get; set; }
        public bool Buying_Allowed { get; set; }
        public List<string> Buying_Modes { get; set; }
        public string Catalog_Domain { get; set; }
        public string Coverage_Areas { get; set; }
        public List<string> Currencies { get; set; }
        public bool Fragile { get; set; }
        public string Immediate_Payment { get; set; }
        public List<string> Item_Conditions { get; set; }
        public bool Items_Reviews_Allowed { get; set; }
        public bool Listing_Allowed { get; set; }
        public int Max_Description_Length { get; set; }
        public int Max_Pictures_Per_Item { get; set; }
        public int Max_Pictures_Per_Item_Var { get; set; }
        public int Max_Sub_Title_Length { get; set; }
        public int Max_Title_Length { get; set; }
        public int Max_Variations_Allowed { get; set; }
        public object Maximum_Price { get; set; }
        public string Maximum_Price_Currency { get; set; }
        public int Minimum_Price { get; set; }
        public string Minimum_Price_Currency { get; set; }
        public object Mirror_Category { get; set; }
        public object Mirror_Master_Category { get; set; }
        public List<object> Mirror_Slave_Categories { get; set; }
        public string Price { get; set; }
        public string Reservation_Allowed { get; set; }
        public List<object> Restrictions { get; set; }
        public bool Rounded_Address { get; set; }
        public string Seller_Contact { get; set; }
        public List<string> Shipping_Options { get; set; }
        public string Shipping_Profile { get; set; }
        public bool Show_Contact_Information { get; set; }
        public string Simple_Shipping { get; set; }
        public string Stock { get; set; }
        public string Sub_Vertical { get; set; }
        public bool Subscribable { get; set; }
        public List<object> Tags { get; set; }
        public string Vertical { get; set; }
        public string Vip_Subdomain { get; set; }
        public List<string> Buyer_Protection_Programs { get; set; }
        public string Status { get; set; }
    }

    public class ChannelsSetting
    {
        public string Channel { get; set; }
        public Settings Settings { get; set; }
    }
}
