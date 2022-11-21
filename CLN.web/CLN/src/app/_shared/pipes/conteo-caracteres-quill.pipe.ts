import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conteoCaracteresQuill'
})
export class ConteoCaracteresQuillPipe implements PipeTransform {

  transform(value: any, max: number): any {
    if (value){
      var auxVal = this.deleteHtml(value);
      return max - auxVal.length;
    }
      
    return 0;
  }

  deleteHtml(data: String) {
    var toReturn = (data) ? data.replace(/<[^>]*>?/g, '') : "";
    toReturn = toReturn.replace(/(\r\n|\n|\r)/gm, "");
    
    return toReturn;
  }
}
