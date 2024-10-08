import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  registerAuthor(author: Author){
    return this.http.post<Author>("https://localhost:7189/api/Authors", author);
  }
  getAuthorName(authorId: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7189/api/Authors/${authorId}`);
  }
}
