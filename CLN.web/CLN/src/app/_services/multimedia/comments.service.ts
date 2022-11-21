import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Comments } from 'src/app/_model/multimedia/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  uri = `${environment.apiUrl}/api/multimediacomments`;

  constructor(
    private http: HttpClient
  ) { }

  getCommentsByMultimediaId(id: number) {
    return this.http.get<Comments[]>(`${this.uri}/getcommentsbymultimediaid/${{id}}`);
  }

  createComment(comment: Comments) {
    return this.http.post<Comments>(`${this.uri}/post`, comment);
  }

  updateComment(id: number, comment: Comment) {
    return this.http.put<Comments>(`${this.uri}/put/${id}`, comment);
  }

  deleteComment(id: number) {
    return this.http.post(`${this.uri}/delete`, { id });
  }
}
