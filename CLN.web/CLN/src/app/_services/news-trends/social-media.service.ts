import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {


  constructor(private http: HttpClient) { }
  apiGTrends = `${environment.apiUrl}/api/GTrends/`;

  getSocialFeatures() {
    return this.http.get(`${this.apiGTrends}GetSocialFeatures`);
    // return {
    //   "succeeded": true,
    //   "message": null,
    //   "errors": null,
    //   "data": {
    //     youtube: {
    //       url: "https://www.googleapis.com/youtube/v3/",
    //       apikey: "AIzaSyCNlHYX068fcnrRNzr1kSog7x3LQ9kTYk8",
    //       id: "UC_ilzqTuxJ3y0_I-aY0b17g",
    //     },
    //     flickr: {
    //       url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&',
    //       apikey: "9fda0b932a86fefe4cb0e224046c9303",
    //       id: "147169504@N08",
    //     },
    //     instagram: {
    //       url: "https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token",
    //       token: "IGQVJXdjdHT1VlRG1jMU5DbkRkZAnZApaG1iQ3A2QVRibWswSjhZAaFR0aGVFMzBfM3IxencyUlhvd0traHhLSGVrWTBVS2MwM3BHT2tiX1hpSU1aTzc4a0JVM0hhaTg3Y2VHM083dGNVRW1TcUN4dkVGeQZDZD",
    //     },
    //     facebook: {
    //       url: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FColombiaProductiva&tabs=timeline&width=500&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId",
    //     },
    //     twitter: {
    //       url: "https://twitter.com/Col_Productiva?ref_src=twsrc%5Etfw",
    //     }
    //   }
    // }
  }

  getYoutube(data:any) {
    const params = new HttpParams()
      .set("part", "snippet")
      .set("channelId", data.id)
      .set("maxResults", "20")
      .set("order", "date")
      .set("key", data.token);

    let url = `${data.url}search`;
    return this.http
      .get(url, { params })
      .pipe(map((resp) => resp));
  }

  getFlickr(data:any) {
    const params = `api_key=${data.token}&user_id=${data.id}&format=json&nojsoncallback=1&per_page=20`;
  
    return this.http.get(data.url + params).pipe(map((res: FlickrOutput) => {
      const urlArr = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
          title: ph.title
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }

  getInstagram(data: any) {
    return this.http.get(data.url + '=' + data.token);
  }
}