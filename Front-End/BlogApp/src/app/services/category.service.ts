import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7189/api/Categories';

  // https://localhost:7189/api/Categories/2

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<any[]>(`${this.apiUrl}/getCategories`);
  }

  getCategoryById(id: number){
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  
}
