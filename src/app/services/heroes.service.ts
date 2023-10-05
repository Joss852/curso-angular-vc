import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Heroe } from '../types/heroe'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private _httpClient: HttpClient) { }

  public getHeroes(): Observable<Heroe[]>{
    return this._httpClient.get<Heroe[]>(`${environment.baseUrl}/heroes`);
  }

  public getHeroe(id: string): Observable<Heroe>{
    return this._httpClient.get<Heroe>(`${environment.baseUrl}/heroes/${id}`);
  }

  public addHeroe(heroe: Heroe): Observable<Heroe>{
    return this._httpClient.post<Heroe>(`${environment.baseUrl}/heroes`, heroe);
  }

  public updateHero(id: string, heroe: Heroe): Observable<Heroe>{
    return this._httpClient.put<Heroe>(`${environment.baseUrl}/heroes/${id}`, heroe);
  }
}
