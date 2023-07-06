import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) {
  }

  find({name, gender, books, series, page}: any) {
    return this.httpClient.post(`${environment.apiUrl}/api/characters`, {
      name,
      gender,
      books,
      series,
      page
    });
  }

  detail({id}: any) {
    return this.httpClient.get(`${environment.apiUrl}/api/characters/${id}`);
  }
}
