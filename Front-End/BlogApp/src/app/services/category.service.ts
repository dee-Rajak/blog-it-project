import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7189/api/Categories';

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<any[]>(`${this.apiUrl}/getCategories`);
  }

  
}
