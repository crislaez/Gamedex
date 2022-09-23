import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gamedex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store, StoreResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseURL: string = this._coreConfig.baseEndpoint;
  perPage: string = `${this._coreConfig.perPage}`;
  apiKey: string = this._coreConfig.apiKey;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getStores(): Observable<Store[]> {
    return this.http.get<StoreResponse>(`${this.baseURL}/stores?key=${this.apiKey}`).pipe(
      map(({ results }) => {
        return results || [];
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

  getStoreById(idStore: number): Observable<Store | {}> {
    return this.http.get<Store>(`${this.baseURL}/stores/${idStore}?key=${this.apiKey}`).pipe(
      map((store) => {
        return store || {};
      }),
      catchError((error) => {
        return throwError(error)
      })
    );
  }




}
